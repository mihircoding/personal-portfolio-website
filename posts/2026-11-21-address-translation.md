---
title: "Chapter 15: Mechanism: Address Translation"
date: 2026-11-21
tags: [os]
summary: "Address translation, base and bounds registers, dynamic relocation, and what the OS does at boot."
---
## 15.1

Efficiency + control are 2 main goals of any modern OS.

Address translation → hardware transforms each memory access (fetch, instruction load) → changing virtual address to physical address where the info is located.

Assumptions:

1. Users' address space contiguously placed in user memory.
2. Size of address space less than size of physical memory.
3. Each address space is the same size.

## 15.2

Example of process in a system:

```figure
relocation
The process's 16KB address space (left) placed in physical memory at 32KB (right). Based on OSTEP Figures 15.1 and 15.2.
```

## 15.3

Base register for each process to place in the address space.

**physical address = base + virtual address**

This is address translation → at runtime.

↳ You can move address spaces even after the process is running.

↳ Dynamic relocation.

The bounds register → used to throw an exception or error if the memory reference is within bounds.

Example: base = 32KB, load from virtual address = 15KB.

- 32 + 15 = 47KB → has the physical address contents.
- If VA was more than 16KB, bounds would throw an error.

```figure
base-bounds
Translating virtual address 15KB with base = 32KB and bounds = 16KB. Based on the OSTEP §15.3 example.
```

Base and bounds registers are on the CPU.

↳ Part of the processor → memory management unit (MMU).

## 15.5

1. OS stores processes in a free list data structure.
2. OS must do something when process is terminated → puts memory back into free list.
3. OS manages the save and restore of base and bounds registers.\
   OS saves values of base and bounds in process control block (PCB).
4. Exception handlers installed at boot time.

| OS @ boot (kernel mode) | Hardware | (No program yet) |
| --- | --- | --- |
| initialize trap table | remember address of system caller, timer handler, illegal memory access handler, illegal instruction handler | |
| start interrupt timer | start timer, interrupt after X ms | |
| initialize process table | | |
| initialize free list | | |
