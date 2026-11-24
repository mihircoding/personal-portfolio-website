---
title: "Chapter 16: Segmentation"
date: 2026-11-24
tags: [os]
summary: "Segment base and size registers, picking the segment with the top bits of the virtual address, a stack that grows backwards, and protection bits."
---
## 16.1

Segmentation fault → memory access on a segmented machine to an illegal address.

**physical address = offset + segment base**

Top bits of virtual address pick the segment: 00 = code, 01 = heap, 11 = stack.

Example: reference to virtual address 100.

```figure
segments
The code, heap and stack segments of a 16KB address space, each placed on its own in physical memory. Based on OSTEP Figures 16.1 and 16.2.
```

| | base | size |
| --- | --- | --- |
| code | 32K | 2K |
| heap | 34K | 3K |
| stack | 28K | 2K |

100 + 32K → 32868 PA

Heap: offset − start of heap + base = PA

4200 − 4096 + 34K = 34920

```figure
segment-bits
Virtual address 4200: the top 2 bits pick the segment, the rest is the offset. Based on the OSTEP §16.1 example.
```

## 16.2

Problems with top 2 bits being the segment identifier:

- Not fully utilizing the space.
- Each segment has a max size.

## 16.3

Stack grows backwards → we need a bit to track positive or negative.

If we want to access 15KB → physical address 27KB.

With 3KB offset, if stack segments are 4KB, then 3 − 4 = −1KB.

Then −1KB + 28KB = 27KB.

```figure
stack-negative
Accessing virtual address 15KB in a stack that grows backwards from base 28KB. Based on the OSTEP §16.3 example.
```

## 16.4

New efficiency → code sharing → sharing memory across processes.

Need protection bits now → read only memory.

↳ Give illusion to each process has its own memory.

| Segment | base | size | Grows positive? | protection |
| --- | --- | --- | --- | --- |
| Code | 32K | 2K | 1 | read-execute |
| heap | 34K | 3K | 1 | read-write |
| Stack | 28K | 2K | 0 | read-write |
