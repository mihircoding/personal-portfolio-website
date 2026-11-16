---
title: "OSTEP notes: chapters 6–10"
tags: [os]
summary: "My notes on CPU virtualization and scheduling from Operating Systems: Three Easy Pieces, written before I started the daily log."
---
All my notes from the days before I started recording in this blog. The diagrams are redrawn from the examples in *Operating Systems: Three Easy Pieces* (OSTEP) by Remzi and Andrea Arpaci-Dusseau.

- [Chapter 6: Limited Direct Execution](#chapter-6-limited-direct-execution)
- [Chapter 7: Scheduling: Introduction](#chapter-7-scheduling-introduction)
- [Chapter 8: Scheduling: The Multi-Level Feedback Queue](#chapter-8-scheduling-the-multi-level-feedback-queue)
- [Chapter 9: Scheduling: Proportional Share](#chapter-9-scheduling-proportional-share)
- [Chapter 10: Multiprocessor Scheduling (Advanced)](#chapter-10-multiprocessor-scheduling-advanced)

## Chapter 6: Limited Direct Execution

### 6.1

The OS can run processes while still having control of the CPU. Limited Direct Execution is the idea that the OS cannot be locked out of CPU access.

- Process → hardware enforces limits; user mode blocks dangerous instructions.

### 6.2

Processes running in user mode cannot run I/O requests.

- The OS runs in kernel mode.
- System call → allows the kernel to explore certain pieces of functionality → creating and destroying processes, allocating memory.

```figure
lde-syscall
User mode and kernel mode: a system call traps into the OS and returns. Based on the limited direct execution protocol in OSTEP §6.2.
```

### 6.3

In order for the OS to gain control of the CPU during a process, a timer device interrupts every *x* milliseconds.

- An interrupt handler in the OS runs → the OS starts this timer on boot.
- Scheduler → decides whether to keep the currently running process or kill it.
- If the scheduler wants to switch, then a context switch is called.
- Context switch → when the OS stops running one process on a CPU and starts running another.
- The purpose of the OS is to virtualize the mechanics of physical hardware.
- The OS "baby-proofs" the CPU by setting trap handlers and an interrupt timer.

```figure
lde-timer
A timer interrupt hands control back to the OS, which context-switches from process A to process B. Based on OSTEP Figure 6.3.
```

## Chapter 7: Scheduling: Introduction

### 7.1

We assume 5 things about an ideal process as an OS:

1. Each job runs for the same amount of time.
2. All jobs arrive at the same time.
3. Once started, each job runs to completion.
4. All jobs only use the CPU.
5. The runtime of each job is unknown.

### 7.2

Turnaround time → the time at which the job completes minus the time it arrived in the system.

`T_turnaround = T_completion − T_arrival`

The OS is always a tradeoff between performance and fairness for scheduling.

### 7.3: First In, First Out (FIFO)

- This method has problems when the first job takes more time.
- High turnaround time even though B and C are fast.

```figure
fifo
FIFO when A is long (100 ms) and B and C are short (10 ms each). B and C wait behind A. Based on OSTEP Figure 7.2.
```

### 7.4: Shortest Job First (SJF)

- This method has an issue when B and C arrive at t = 10: SJF still makes A go first.

```figure
sjf
SJF on the same three jobs, all arriving at t = 0. Based on OSTEP Figure 7.3.
```

```figure
sjf-late
SJF when B and C arrive at t = 10. A is already running, so they wait. Based on OSTEP Figure 7.4.
```

### 7.5: Shortest Time-to-Completion First (STCF)

- We check all available jobs to find which is the fastest to completion.

```figure
stcf
STCF preempts A when B and C arrive. Based on OSTEP Figure 7.5.
```

### 7.6: Response time and Round Robin

Response time → the time from arrival to scheduling.

`T_response = T_firstrun − T_arrival`

Round Robin → runs a job for a time slice, then switches to the next job in the queue.

- Round Robin is high fairness, low performance (turnaround time).
- These are tradeoffs:
  - SJF, STCF → optimize turnaround time.
  - RR → optimizes response time.
- The OS uses a preemptive scheduler.

```figure
sjf-vs-rr
Three 5 ms jobs under SJF and under Round Robin with a 1 ms time slice. Based on OSTEP Figures 7.6 and 7.7.
```

## Chapter 8: Scheduling: The Multi-Level Feedback Queue

MLFQ → Multi-Level Feedback Queue

We want to build a scheduler that helps turnaround time and response time with no prior knowledge of the jobs.

- **Rule 1:** If Priority(A) > Priority(B), A runs.
- **Rule 2:** If Priority(A) = Priority(B), A and B run in RR.

```figure
mlfq-queues
MLFQ queues: A and B share the top queue and run in Round Robin; C and D wait at lower priorities. Based on OSTEP Figure 8.1.
```

### 8.2

We want to figure out when to change priority in the queue.

Allotment → the amount of time a job can spend at a given priority.

- **Rule 3:** When a job enters, it is at the highest priority.
- **Rule 4a:** If a job uses up its allotment → it moves down in the queue.
- **Rule 4b:** If a job gives up the CPU before its allotment is up, it stays at the same level in the queue.
- The goal is to assume a short job until proven otherwise.

```figure
mlfq-long-short
Three queues with a 10 ms allotment. Long job A sinks to Q0; short job B arrives at t = 100 and finishes near the top. Based on OSTEP Figures 8.2 and 8.3.
```

### 8.3 + 8.4

- Avoid starvation → the CPU resource is being used by too many small interactive I/O jobs.
- **Rule 5:** After some time *S*, move all the jobs in the system to the topmost queue.
- **Rule 4 (general):** Once a job uses its allotment at a given level, its priority is reduced by one.

```figure
mlfq-no-boost
Without a priority boost: once interactive jobs B and C arrive, long job A never runs.
```

```figure
mlfq-boost
With a priority boost every 50 ms, A moves back to the top queue and keeps making progress. Simplified from OSTEP Figure 8.5.
```

### 8.5

- BSD Unix and Windows → use MLFQ.
- MLFQ → best of both turnaround time and response time.

## Chapter 9: Scheduling: Proportional Share

### 9.1

Lottery scheduling → processes are given an amount of tickets to probabilistically determine their share of the CPU resource.

```figure
lottery
A holds 75 tickets and B holds 25. Each time slice the scheduler draws a random ticket. Based on the example in OSTEP §9.1.
```

### 9.2, 9.3, 9.4

- A user's tickets given to jobs are proportional to the amount of tickets they have → ticket currency.
- As the length of jobs gets longer (in time slices), the fairness becomes higher with lottery scheduling.

```figure
lottery-fairness
Two jobs with equal tickets: the longer they run, the closer they finish to the same time (U = 1). Sketch of the trend in OSTEP Figure 9.2.
```

### 9.6: Stride scheduling

Stride scheduling → each process has a stride inversely proportional to its ticket count.

1. We run all processes and set the stride amounts: A = 100, B = 200, C = 40.
2. Then take the minimum of the queue (C) → update it by its stride, 40.
3. Then repeat: 40 → 80 → 120, then 100 → 200, and C 120 → 160 → 200.

```figure
stride
Each step, the process with the lowest pass value runs, then its pass goes up by its stride. Based on OSTEP Figure 9.3.
```

### 9.7: The Completely Fair Scheduler (CFS)

- Counting technique → virtual runtime → the process with the lowest runtime runs next.
- `sched_latency` → (48 ms) typically divided by *n* is the effective time slice.
  - 48 / 4 = 12 ms
  - The process then switches to 24 ms after C and D leave the system.
- `min_granularity` → (6 ms) typically the lowest switch for a given process.
  - n = 10: 48 / 10 = 4.8 ms would not work, because the system defaults to 6 ms at minimum.
- Nice value → −20 (highest priority) to +19 (lowest priority); a way to divide the CPU.
- vruntime:

`vruntime_i = vruntime_i + (weight_0 / weight_i) × runtime_i`

```figure
cfs
CFS with four jobs and sched_latency = 48 ms. After C and D finish, A and B each get 24 ms. Based on OSTEP Figure 9.4.
```

- CFS addresses are kept in a red-black tree data structure.
- Better performance than a binary tree in worst-case scenarios → log *n*.

```figure
cfs-tree
A red-black tree of processes keyed by vruntime. Based on OSTEP Figure 9.5.
```

## Chapter 10: Multiprocessor Scheduling (Advanced)

### 10.1: How do we schedule on multiple CPUs?

- Temporal locality → a piece of data that is accessed will be accessed again in the future.
- Spatial locality → items near accessed items are likely to be accessed.
- The hardware solution to cache coherence is bus snooping: each cache pays attention to the bus to main memory for updates, and either updates or invalidates its copy.

```figure
multicore-cache
Two CPUs with their own caches share main memory over a bus. Based on OSTEP Figures 10.2 and 10.3.
```
