namespace ArrayExample {
  function printArray(arrayName: string, arr: Array<string>) {
    console.log(arrayName + ":");
    for (let element of arr) {
      console.log(element);
    }

    console.log();
  }

  function showArrayUsage() {
    // Variant 1:

    // Empty Array
    let bracketEmptyArray: string[] = [];
    printArray("bracketEmptyArray", bracketEmptyArray);

    // Statically Initialized Array
    let bracketInitArray: string[] = ["California", "Washington"];
    printArray("bracketInitArray", bracketInitArray);

    // Variant 2:

    // Empty Array
    let objectEmptyArray: Array<string> = new Array<string>();
    printArray("objectEmptyArray", objectEmptyArray);

    // Statically Initialized Array
    let objectInitArray: Array<string> = new Array<string>(
      "California",
      "Washington"
    );
    printArray("objectInitArray", objectInitArray);

    // Note, that Array<T> and T[] are fully interchangeable:

    // Empty Array
    let objectBracketEmptyArray: Array<string> = [];
    printArray("objectBracketEmptyArray", objectBracketEmptyArray);

    // Statically Initialized Array Variant 3
    let objectBracketInitArray: Array<string> = ["California", "Washington"];
    printArray("objectBracketInitArray", objectBracketInitArray);
  }

  export function Main() {
    showArrayUsage();
  }
}

ArrayExample.Main();

/*
Output:

bracketEmptyArray:

bracketInitArray:
California
Washington

objectEmptyArray:

objectInitArray:
California
Washington

objectBracketEmptyArray:

objectBracketInitArray:
California
Washington
*/