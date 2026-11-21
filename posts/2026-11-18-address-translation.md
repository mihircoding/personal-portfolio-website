---
title: "Address translation: base and bounds (OSTEP 14.4–15.3)"
date: 2026-11-18
tags: [os]
summary: "Common memory errors, the DATA and BSS regions, and how base and bounds registers translate virtual addresses to physical addresses at runtime."
---
## 14.4: Common memory errors

- Buffer overflow → not making enough memory, resulting in unexpected errors.
- Memory leak → not using `free()` for a while leads to a memory leak and crashes.
- Dangling pointer → freeing memory before you're finished using it.

Once a process exits, the OS reclaims all memory.

↳ Bad practice → in large server programs, memory will leak.

Stack and heap allocation don't determine cache locality or memory access latency.

Variables that exist for the entire run (global, static) need permanent memory → split into 2 regions: DATA + BSS.

- **DATA** → holds permanent variables with real non-zero values → the compiler writes the value into the executable file → when it starts, it is copied into memory.
- **BSS** (block started by symbol) → holds permanent variables that start at 0. The executable doesn't store these values. The OS uses memory already filled with 0.

## Chapter 15: Mechanism: Address Translation

### 15.1

Efficiency + control are the 2 main goals of any modern OS.

Address translation → hardware transforms each memory access (fetch, instruction load) → changing the virtual address to the physical address where the info is located.

Assumptions:

1. The user's address space is contiguously placed in user memory.
2. The size of the address space is less than the size of physical memory.
3. Each address space is the same size.

### 15.2: Example of a process in a system

```figure
relocation
The process's 16KB address space (left) placed in physical memory at 32KB (right). Based on OSTEP Figures 15.1 and 15.2.
```

### 15.3: Dynamic relocation

Base register for each process to place in the address space.

**physical address = base + virtual address**

This is address translation → at runtime.

↳ You can move address spaces even after the process is running.

↳ Dynamic relocation.

The bounds register → used to throw an exception or error if the memory reference is within bounds.

Example: base = 32KB, load from virtual address = 15KB.

- 32 + 15 = 47KB → has the physical address contents.
- If the VA was more than 16KB, bounds would throw an error.

```figure
base-bounds
Translating virtual address 15KB with base = 32KB and bounds = 16KB. Based on the OSTEP §15.3 example.
```

Base and bounds registers are on the CPU.

↳ Part of the processor → memory management unit (MMU).
