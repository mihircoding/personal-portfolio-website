---
title: "Address translation: base and bounds (OSTEP 14.4–15.3)"
date: 2026-11-18
tags: [os]
summary: "Buffer overflows, memory leaks, dangling pointers, DATA + BSS, and base and bounds registers for address translation."
---
## 14.3 + 14.4

- Buffer overflow → not making enough memory, resulting in unexpected errors.
- Memory leak → not using `free()` for a while leads to memory leak and crashes.
- Dangling pointer → freeing memory before finished using it.

```figure
memory-errors
Buffer overflow, memory leak and dangling pointer.
```

Once process exits, the OS reclaims all memory.

↳ Bad practice → in large server programs, memory will leak.

Stack and heap allocation don't determine cache locality or memory access latency.

Variables that exist for entire runs (global, static) need permanent memory → split into 2 regions: DATA + BSS.

- **DATA** → holds perma variables with real non-zero values → compiler writes value into executable file → when starts, it is copied into memory.
- **BSS** (block started by symbol) → holds perma variables that start at 0. Executable doesn't store these values. The OS uses memory already filled with 0.

```figure
data-bss
DATA values are stored in the executable file and copied into memory. BSS values are not stored; the OS uses memory already filled with 0.
```

## Chapter 15: Mechanism: Address Translation

### 15.1

Efficiency + control are 2 main goals of any modern OS.

Address translation → hardware transforms each memory access (fetch, instruction load) → changing virtual address to physical address where the info is located.

Assumptions:

1. Users' address space contiguously placed in user memory.
2. Size of address space less than size of physical memory.
3. Each address space is the same size.

### 15.2

Example of process in a system:

```figure
relocation
The process's 16KB address space (left) placed in physical memory at 32KB (right). Based on OSTEP Figures 15.1 and 15.2.
```

### 15.3

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
