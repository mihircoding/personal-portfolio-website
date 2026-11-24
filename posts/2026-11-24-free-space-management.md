---
title: "Chapter 17: Free-Space Management"
date: 2026-11-24
tags: [os]
summary: "External fragmentation, free lists with splitting and coalescing, allocation headers, best/worst/first/next fit, segregated lists, slab allocation and the binary buddy allocator."
---
## 17.1

External fragmentation → free space is available but is segmented in a non contiguous way so it's unusable.

```figure
fragmentation
A 30-byte heap with 10 bytes used in the middle. Based on the OSTEP §17.1 example.
```

A request for 15 bytes would fail even though 20 is available.

## 17.2

A free list → set of elements to describe free memory in heap.

```figure
free-list
Based on the OSTEP §17.2 free list example.
```

Splitting → splits available space to accommodate for a smaller memory request.

```figure
free-list-split
Based on the OSTEP §17.2 splitting example.
```

When `free(10)` is called we do

↳ Coalescing → instead of having separate free memory blocks we look at neighboring blocks to combine.

```figure
free-list-coalesce
Based on the OSTEP §17.2 coalescing example.
```

When calling `free(void *ptr)` → no size parameter.

Most allocators store extra info in header block.

Example:

```c
typedef struct {
    int size;
    int magic;
} header_t;
```

```c
void free(void *ptr) {
    header_t *hptr = (header_t *) ptr - 1;
}
```

```figure
header
The header sits right before the memory given to the caller. Based on OSTEP Figure 17.1.
```

Size of free region = size of header + space allocated to user.

Library searches for N + header size.

```figure
heap-split
A 4KB heap with one free chunk (left), then after a 100-byte request (right). Based on OSTEP Figures 17.3 and 17.4.
```

- Traditional allocators start with a small heap that grows by requesting the OS for memory → system call.

## 17.3

Strategies for managing free space

**Best Fit**

- Search free list → find best available chunk.
- Simple intuition → implementation → heavy performance penalty.

**Worst Fit**

- Search free list → find biggest chunk.
- Tries to keep big chunks available.
- Still same performance problems.

**First Fit**

- Returns first block that's available.
- Pollutes beginning with small objects.
- Address based ordering keeping list ordered by address of free space.

**Next Fit**

- Keep a pointer to last search to uniformly spread out first fit searches → leads to loss from splintering.

```figure
fits
A free list of 10, 30 and 20 bytes after a request for 15 bytes. Based on the OSTEP §17.3 examples.
```

## 17.4

Segregated lists → if an application keeps requesting same thing → keep a list for that popular request size → other requests go to general allocator.

New question: How do we decide how much to allocate to this list or specialized request?

Slab allocation → when kernel boots it allocates object caches for objects that will be requested frequently (locks, file-system etc).

↳ When a given cache is low on free space it requests from general allocator.

When a given cache is empty the general allocator coalesces it back.

Binary buddy allocator → think of free memory as a 2ᴺ space.

When req comes in we divide the space by 2 until we cannot fill req.

```figure
buddy
Request for 7KB. Based on OSTEP Figure 17.8.
```

This block gets chosen.

↳ When freeing this block we check if buddy is free then coalesce if yes.

↳ Recursively coalesce 8 → 16 → 32 → 64, this is efficient coalescing.
