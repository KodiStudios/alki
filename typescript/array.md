---
title: Array
---

{% include breadcrumbs.html %}

# {{page.title}}

Typescript supports Array<> and [] syntax to define arrays. They are interchangeable.

Example:

```typescript
let bracketEmptyArray: string[] = [];

let bracketInitArray: string[] = [
    "California",
    "Washington"
];

let objectEmptyArray: Array<string> = new Array<string>();

let objectInitArray: Array<string> = new Array<string>(
    "California",
    "Washington"
);

let objectBracketEmptyArray: Array<string> = [];

let objectBracketInitArray: Array<string> = [
    "California",
    "Washington"
];
```
