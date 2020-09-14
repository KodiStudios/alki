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

    printArray("bracketEmptyArray", bracketEmptyArray);
    printArray("bracketInitArray", bracketInitArray);
    printArray("objectEmptyArray", objectEmptyArray);
    printArray("objectInitArray", objectInitArray);
    printArray("interchangeable1", interchangeable1);
    printArray("interchangeable2", interchangeable2);
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
