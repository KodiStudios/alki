---
title: Foreach
---

{% include breadcrumbs.html %}

# {{page.title}}

In Typescript, there are two foreach loop types, for..of and for...in.

For...of is a standard foreach loop:

```typescript
let cities: Array<string> = new Array<string>();
cities.push("Los Angeles");
cities.push("Seattle");

for (let city of cities) {
    console.log(city);
}
```

Note:  
Note there is anota difference "in" and "of"  
This is different from for (var process in processes){}  
For..in will list all properties of object, including interited  

For..of is a true foreach loop  

References:
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of>
