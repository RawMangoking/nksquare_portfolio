---
title: Reinforcement learning for generalized door manipulation
cardTitle: Door-opening robot hand
brief: Can a robot hand trained on randomized doors be better?
kind: main
status: active
order: 1
period: 2026–2027, final-year capstone
tech: [MuJoCo, Python, Gymnasium, SB3 / SAC, SolidWorks]
repo: https://github.com/RawMangoking/Human_hand_200
highlight: { value: '18', label: 'position-controlled joints, modelled from our own CAD' }
team: [Naren Kumar C, Lakshmi Narayanan P]
mentor: Dr. Priya GL
cover: ../../assets/misc/hand-hologram.png
coverAlt: Red wireframe render of the robot hand and forearm, generated from its MuJoCo model.
files:
  - name: hand-model-render.png
    image: ../../assets/misc/hand-hologram.png
    caption: The 200 mm hand with its forearm and two-degree-of-freedom wrist, rendered from the MuJoCo model.
---

## The problem

A reinforcement-learning policy trained on one fixed door tends to specialise in that door. Change the door's weight, the hinge friction or where the hand starts, and the behaviour it needs changes too.

A human-like hand makes learning harder in a second way: it has many joints, and one policy controlling all of them faces a very large action space.

## Our approach

We split the task into three stages, each with its own policy that controls only the joints it needs:

1. **Reach the handle** (6 actions)
2. **Grasp and turn the handle** (12 actions; the middle, ring and little fingers move together as one)
3. **Push or pull the door open** (4 actions)

To test generalization, we train the policies twice: once on a single fixed door, and once with randomized door mass, hinge and handle friction, and starting hand pose. Both are then tested on the same set of doors neither has seen, measuring success rate, completion time and final door angle.

We don't assume randomization or modular policies will win. The point is to measure it.

## Progress so far

- The hand (with forearm and wrist) and a door with a frame, hinge and rotating handle are modelled in SolidWorks.
- Both are converted into MuJoCo with correct joints, limits and collisions. The handle collides with the frame, so the door can't open until the handle is turned.
- Keyboard and gamepad control let us verify every joint's direction and range by hand.
- A combined hand-and-door Gymnasium environment exists, with the three stages above and SAC training through Stable-Baselines3.

## Next

Add domain randomization of the door, train both versions of the policies, and test them on unseen doors.
