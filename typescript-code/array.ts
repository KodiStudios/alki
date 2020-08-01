namespace ArrayPage {

    function PrintArray(arrayName: string, arr: Array<string>) {
        console.log(arrayName + ":");
        for (let element of arr) {
            console.log(element);
        }

        console.log();
    }

    function ShowGeo() {
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

        PrintArray("bracketEmptyArray", bracketEmptyArray);
        PrintArray("bracketInitArray", bracketInitArray);
        PrintArray("objectEmptyArray", objectEmptyArray);
        PrintArray("objectInitArray", objectInitArray);
        PrintArray("objectBracketEmptyArray", objectBracketEmptyArray);
        PrintArray("objectBracketInitArray", objectBracketInitArray);
    }

    export function Main() {
        ShowGeo();
    }

}

ArrayPage.Main();
