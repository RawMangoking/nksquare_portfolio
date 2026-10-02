---
title: 'Swarm-Fleet: decentralized multi-robot task allocation'
cardTitle: Swarm-Fleet
brief: Warehouse robots that divide the work among themselves, with no central dispatcher.
kind: main
status: complete
order: 2
period: '2026'
tech: [ROS 2 Jazzy, Gazebo, Zenoh, Raft, Docker, Kubernetes, Python]
repo: https://github.com/RawMangoking/Decentralized-Multi-Robot-Task-Allocation-
highlight: { value: '~7 s', label: 'leader failover, with robots still completing tasks' }
cover: ../../assets/projects/swarm-environment.jpg
coverAlt: Gazebo warehouse with rows of shelves, five black robot markers and small yellow boxes.
files:
  - name: warehouse-environment.jpg
    image: ../../assets/projects/swarm-environment.jpg
    caption: 'The Gazebo warehouse: five robots (black) bid on and deliver boxes around rows of shelves.'
---

## The problem

Most warehouse fleets rely on a central dispatcher to hand out work. If it goes down, everything stops. I wanted to see whether robots could agree among themselves who does each task, and how to keep the rest of the system running when parts of it fail.

## How it works

- When a pickup task is announced, every robot bids its path distance to the box, computed with BFS around the shelves.
- Robots broadcast bids and claims and confirm the winner with a majority acknowledgement, so every robot independently reaches the same answer. No dispatcher decides.
- Each robot runs as its own pod on Kubernetes (`kind`). All ROS 2 traffic between pods goes through a Zenoh router, because default ROS 2 discovery doesn't cross pod networks; I confirmed that by testing.
- The service that announces tasks runs as three replicas with a Raft-elected leader, so killing the leader triggers an automatic failover.

## Results from chaos testing

| Test | Result |
|---|---|
| Kill the task-announcer leader | New leader elected in about 7 seconds; robots kept bidding and completing tasks |
| Kill a robot mid-task | Its task is lost; there's no retry yet |
| Task IDs after failover | The new leader restarts numbering from 0, a collision risk I documented |

## What I learned

- **Different problems, different consensus.** The swarm needs many robots acting at once, so it uses its own bid-and-claim protocol. The task announcer must have exactly one writer, so it uses Raft.
- **I found a flaw before it shipped.** Working a five-robot example by hand showed that an earlier majority-vote design could confirm several winners at once. I kept the simpler design, documented the remaining risk and tested it, rather than hiding it.
- **Test assumptions.** Zenoh's default peer mode silently failed across pods; forcing client mode through the router fixed it.

Next steps would be retrying dropped tasks, moving task IDs into Raft's replicated state, and scaling tests at 10–50 robots.
