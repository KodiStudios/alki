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

export function WriteTocJson(
  directoryPath: string,
  append: boolean,
  recursive: boolean
) {
  if (recursive) {
    // Get directories, non-recursively
    let directories: string[] = Ladro.GetDirectories(directoryPath);

    for (let directory of directories) {
      let fullPath: string = path.join(directoryPath, directory);
      if (fs.lstatSync(fullPath).isDirectory()) {
        WriteTocJson(fullPath, append, recursive);
      }
    }
  }

  const tocJsonFileName: string = "_toc.json";
  const tocJsonFilePath: string = path.join(directoryPath, tocJsonFileName);

  let tocObject: any;

  if (append && fs.existsSync(tocJsonFilePath)) {
    tocObject = JSON.parse(fs.readFileSync(tocJsonFilePath).toString());
  } else {
    // Create empty object, so that toc is generated
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

  fs.writeFileSync(path.join(directoryPath, tocJsonFileName), tocJsonContent);
}
