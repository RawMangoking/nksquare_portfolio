---
title: Imitation learning for robot navigation
cardTitle: Behavior cloning TurtleBot
brief: A TurtleBot3 learns to drive around obstacles by imitating an expert, using only its LiDAR.
kind: main
status: complete
order: 3
period: '2026'
tech: [ROS 2 Jazzy, Gazebo Harmonic, PyTorch, Python]
repo: https://github.com/RawMangoking/behavior_cloning_turtle
highlight: { value: '23% → 7%', label: 'collisions after two rounds of DAgger' }
cover: ../../assets/projects/turtlebot-poster.jpg
coverAlt: TurtleBot3 driving between cylinder obstacles in Gazebo.
files:
  - name: dagger-policy-driving.mp4
    video: /media/turtlebot-dagger.mp4
    poster: ../../assets/projects/turtlebot-poster.jpg
    caption: The DAgger policy driving to its goal around obstacles, at 3× speed.
  - name: outcomes.png
    image: ../../assets/projects/turtlebot-outcomes.png
    caption: Success, collision and timeout rates for every controller on the same 100 unseen layouts.
  - name: dagger-vs-validation-loss.png
    image: ../../assets/projects/turtlebot-dagger.png
    caption: Validation loss kept falling with each DAgger round, while success in the simulator did not improve.
  - name: every-test-layout.png
    image: ../../assets/projects/turtlebot-layouts.png
    caption: The outcome on every one of the 100 test layouts.
---

## The problem

Can a robot learn to navigate just by copying an expert? Plain copying, called behavior cloning, has a known weakness: once the robot drifts off the expert's path, it has never seen how to recover.

## How it works

- A 4 m × 4 m Gazebo arena with randomly placed obstacles, and a random start and goal every episode.
- The robot sees 26 numbers: its 360° LiDAR reduced to 24 sectors, plus distance and heading to the goal.
- A hand-written gap-following controller acts as the expert.
- A small neural network (two hidden layers of 128) learns to copy it.
- **DAgger** fixes the drift problem: the network drives while the expert quietly labels every state it visits, including the ones just before a crash.

Every result below comes from the same 100 unseen layouts, so the rows compare directly.

## Results

| Controller | Success | Collision | Timeout |
|---|---|---|---|
| Expert | 79% | 4% | 17% |
| Behavior cloning | 64% | 23% | 13% |
| **DAgger, round 2** | **73%** | **7%** | 20% |
| DAgger, round 5 | 63% | 15% | 22% |

## What I learned

- **DAgger works.** Collisions fell from 23% to 7%, and success reached 92% of the expert's.
- **More rounds stopped helping.** Success plateaued around 72%, then dropped.
- **Lower loss didn't mean better driving.** Validation loss fell every round while success stayed flat; only closed-loop tests in the simulator show real performance.
- **I tested a hypothesis and rejected it.** I suspected the expert's memory confused the network, relabelled the whole dataset with a memory-free expert and retrained. Nothing changed, so the cause lies elsewhere: most likely the network averaging the expert's sharp left-or-right choices into hesitation.
