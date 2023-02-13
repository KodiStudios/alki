import * as fs from "fs"; // File Manipulation
import * as path from "path";
import * as Ladro from "../../Ladro/Ladro";

// Non-Recursive
export function GetWikiFilesAndDirectories(directoryPath: string): string[] {
  // Read Files and Directories
  let filesAndDirs: string[] = Ladro.GetFilesAndDirectories(directoryPath);

  let filesAndDirsResult: string[] = [];

  for (let fileAndDir of filesAndDirs) {
    if (
      !fileAndDir[0].startsWith("_") && // Exclude
      fileAndDir.toUpperCase() !== "ReadMe.md".toUpperCase() // Exclude
    ) {
      filesAndDirsResult.push(fileAndDir);
    }
  }

  return filesAndDirsResult;
}

// Reads File Names in a given Directory
// And creates _toc.json File
export function WriteTocJson(
  directoryPath: string,
  append: boolean, // Append to existing _toc.json
  recursive: boolean
): string {
  if (recursive) {
    // Get Child directories, non-recursively
    let childDirectories: string[] = Ladro.GetDirectories(directoryPath);

    // Dive into each Child Directory
    for (let childDirectory of childDirectories) {
      let childDirectoryFullPath: string = path.join(
        directoryPath,
        childDirectory
      );
      if (fs.lstatSync(childDirectoryFullPath).isDirectory()) {
        // Call itself recursive
        // Depth-First Search
        WriteTocJson(childDirectoryFullPath, append, recursive);
      }
    }
  }

  const tocJsonFileName: string = "_toc.json";
  const tocJsonFilePath: string = path.join(directoryPath, tocJsonFileName);

  let tocObject: any;

  if (append && fs.existsSync(tocJsonFilePath)) {
    // Read existing _toc.json
    tocObject = JSON.parse(fs.readFileSync(tocJsonFilePath).toString());
  } else {
    // Create an empty object, so that toc is generated
    tocObject = new Object();
    tocObject.pages = [];
  }

  let leftoverFilesAndDirs: string[] = GetWikiFilesAndDirectories(
    path.dirname(tocJsonFilePath)
  );

  // Find all files which are NOT part of tocObject
  for (let leftoverFile of leftoverFilesAndDirs) {
    if (!tocObject.pages.includes(leftoverFile)) {
      tocObject.pages.push(leftoverFile);
    }
  }

  let tocJsonContent: string = JSON.stringify(
    tocObject,
    /*replacer*/ null,
    /*indentation*/ 2
  );

  fs.writeFileSync(tocJsonFilePath, tocJsonContent);

  return tocJsonFilePath;
}
