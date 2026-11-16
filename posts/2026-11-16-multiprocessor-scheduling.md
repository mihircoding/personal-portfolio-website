---
title: "Multiprocessor scheduling (OSTEP 10.2–10.7)"
date: 2026-11-16
tags: [os]
summary: "Locking, cache affinity, single-queue vs multi-queue scheduling, and the Linux multiprocessor schedulers."
---
## 10.2

When accessing data that is shared, we need a locking mechanism.

- Locking → to stop issues with multiple CPUs accessing parts of a program.
- Problem → as CPUs grow, access to the shared data structure → slow!

## 10.3

Cache affinity → processes build state in the caches on 1 CPU → will run faster on that CPU → if run on another CPU, performance is worse → consider when making scheduling decisions.

Cache coherence → ensures all processors have a consistent view of shared memory.

## 10.4: Single Queue Scheduling (SQMS)

- Basic schedule from 1 global queue → simplicity.
- Not scalable → more CPUs, more time spent on locking overhead.
- Bad cache affinity → jobs keep switching between CPUs.

```figure
sqms
One queue of jobs A–E shared by four CPUs. Each job keeps moving to a different CPU. Based on the SQMS example in OSTEP §10.4.
```

Strength is simplicity.

Weakness → scalability + cache affinity.

## 10.5: Multi Queue Scheduling (MQMS)

- Multiple queues, typically with # equivalent to the number of CPUs.
- Solves the scalability problem.
- Load imbalance → the distribution of jobs between CPUs can lead to inefficiency in the whole system.

```figure
mqms-imbalance
Q0 has only A while Q1 has B and D. Based on the load imbalance example in OSTEP §10.5.
```

If A gets finished, then CPU 0 is idle.

```figure
mqms-idle
Q0 is empty, so CPU 0 has nothing to run. Based on OSTEP §10.5.
```

- Solution to load imbalance → migration → move tasks from full queues to queues that are empty.
  - How do we know when to do this?
  - Work stealing → a queue low on jobs occasionally peeks at a queue with a lot of jobs; once the difference is some *x* amount, then migration happens.
  - Peeking → overhead, so still find a balance for when to do it.

```figure
migration
Work stealing: empty Q0 peeks at Q1 and migrates D. Based on the migration example in OSTEP §10.5.
```

## 10.6 + 10.7: Linux multiprocessor schedulers

### O(1) scheduler

O(1) scheduler → next tasks take constant time.

- Similar to MLFQ.
- Lowest priority → smallest timeslice values.
- Highest priority → highest timeslice values.
- Feedback:
  - More time sleeping → more interactive → boost priority.
  - Less time sleeping → less interaction → less priority.
- Heuristic based → replaced by CFS.

```figure
o1-scheduler
O(1) scheduler: priority sets the timeslice, and sleeping vs. running moves a task's priority up or down.
```

### BFS (Brain Fuck Scheduler)

- One global queue.
- Each task gets a deadline: now + (priority ratio × rr_interval).
- Earliest virtual deadline first policy.
- Low latency + simplicity on low CPU counts.

```figure
bfs
BFS keeps every task in one queue ordered by virtual deadline; a CPU runs the task with the earliest deadline. Deadline values are illustrative.
```
