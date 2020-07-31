---
title: Foreach
---

{% include breadcrumbs.html %}

# {{page.title}}

```typescript
let cities: Array<string> = new Array<string>();
cities.push("Los Angeles");
cities.push("Seattle");

for (let city: string of cities)
{
    console.log(city);
}

```

Another solution:  
for (var process of processes){}

Note:  
Note there is a difference "in" and "of"  
This is different from for (var process in processes){}  
For..in will list all properties of object, including interited  

For..of is a true foreach loop  

References:
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of>
