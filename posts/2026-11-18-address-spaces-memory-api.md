---
title: "Chapters 13 + 14: Address Spaces and the Memory API"
date: 2026-11-18
tags: [os]
summary: "Why each process gets its own virtual address space, the goals of virtual memory, stack vs. heap memory with malloc() and free(), common memory errors, and DATA + BSS."
---
## Chapter 13

### 13.2 + 13.3

- Interactivity → multiple users waiting for their tasks' completion.
- Time sharing → sharing memory between multiple processes.

```figure
memory-sharing
Several processes share physical memory at the same time, with free space between them. Based on OSTEP Figure 13.2.
```

Address space → contains all the memory state of the running program.

- Heap → contains `malloc` data → dynamically growing structures.
- Stack → contains local variables → procedure calls, return values.

```figure
address-space
An example 16KB address space. The heap grows down and the stack grows up into the free space between them. Based on OSTEP Figure 13.3.
```

This is an abstraction from the OS, because 0KB is not the actual address in memory; it's the virtual address with respect to this process. ← Called **virtualizing memory**.

### 13.4

1. **Transparency** → implement VM so it's invisible to the running program.
2. **Efficiency** → in time + space → rely on hardware.
3. **Protection** → protect processes from one another → isolation is good.

## Chapter 14

### 14.1

Stack memory → allocations + deallocation managed by the compiler.

```c
void func() {
    int x; // makes sure there's space and then allocates on stack
}
```

Heap memory → allocations + deallocations are handled by the user.

```c
void func() {
    int *x = (int *) malloc(sizeof(int)); // returns success or NULL
}
```

- `int *x` → compiler makes space for pointer to int.
- `malloc(sizeof(int))` → requests space for int on heap.

### 14.2

- `malloc()` ← compile time operator → size known at compile time.
- `malloc(strlen(s) + 1)` ← allocating for end of string char.

```c
int *x = malloc(10 * sizeof(int));
printf("%d\n", sizeof(x)); // 4 or 8
```

↳ Prints the size of `x`, not the memory allocated.

### 14.3 + 14.4

`free()` → takes 1 argument → tracks the amount of memory to free from heap.

In more modern languages, garbage collectors handle this.

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
