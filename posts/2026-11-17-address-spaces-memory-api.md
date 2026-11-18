---
title: "Address spaces and the memory API (OSTEP 13.2–14.4)"
date: 2026-11-17
tags: [os]
summary: "Why each process gets its own virtual address space, the goals of virtual memory, and stack vs. heap memory with malloc() and free()."
---
## 13.2 + 13.3: Address spaces

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

## 13.4: Goals of a virtual memory system

1. **Transparency** → implement VM so it's invisible to the running program.
2. **Efficiency** → in time + space → rely on hardware.
3. **Protection** → protect processes from one another → isolation is good.

## 14.1: Stack vs. heap memory

Stack memory → allocations + deallocations managed by the compiler.

```c
void func() {
    int x; // makes sure there's space, then allocates it on the stack
}
```

Heap memory → allocations + deallocations are handled by the user.

```c
void func() {
    int *x = (int *) malloc(sizeof(int)); // returns success or NULL
}
```

- `int *x` → compiler makes space for a pointer to an int.
- `malloc(sizeof(int))` → requests space for an int on the heap.

## 14.2: malloc()

- `sizeof()` → compile-time operator → size known at compile time.
- `malloc(strlen(s) + 1)` → the + 1 allocates room for the end-of-string character.

```c
int *x = malloc(10 * sizeof(int));
printf("%d\n", sizeof(x)); // 4 or 8
```

This prints the size of `x` (a pointer), not the memory allocated.

## 14.3 + 14.4: free()

`free()` → takes 1 argument (the pointer from `malloc`) → the library tracks the amount of memory to free from the heap.

In more modern languages, garbage collectors handle this.
