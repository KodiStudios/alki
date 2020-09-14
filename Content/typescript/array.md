---
title: Array
---

{% include breadcrumbs.html %}

# {{page.title}}

Typescript supports Array<> and [] syntax to define arrays. They are interchangeable.

Example:

```typescript
// Variant 1:

// Empty Array
let bracketEmptyArray: string[] = [];

// Statically Initialized Array
let bracketInitArray: string[] = ["California", "Washington"];

// Variant 2:

// Empty Array
let objectEmptyArray: Array<string> = new Array<string>();

// Statically Initialized Array
let objectInitArray: Array<string> = new Array<string>(
  "California",
  "Washington"
);

// Note, that Array<T> and T[] are fully interchangeable:

let interchangeable1: Array<string> = [];
let interchangeable2: string[] = new Array<string>();
```
