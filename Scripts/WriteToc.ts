// Read _toc.json

import * as fs from "fs";
import * as path from "path";
import * as yargs from "yargs"; // Process Arguments
import * as TocJsonLib from "./Assets/TocJsonLib";

namespace Toc {
  // Creates Md Link out of string
  function ToMdLink(value: string) {
    let linkString: string = "";

    linkString = `[${value}](${value})`;

    return linkString;
  }

  function GenerateReadMeToc(tocJsonFilePath: string): string {
    let tocObject: any = JSON.parse(fs.readFileSync(tocJsonFilePath).toString());

    // Header Content
    // From Assets/TocHeader.md
    let headerMdContent: string = fs
      .readFileSync(path.join(__dirname, "Assets", "TocHeader.md"))
      .toString();

    // Body content
    // From tocObject
    let tocMdContent: string = "";
    for (let pageName of tocObject.pages) {
      tocMdContent += ToMdLink(pageName);
      tocMdContent += "  \n"; // Note, double space is important, it creates new-line in md syntax
    }

    tocMdContent = headerMdContent + tocMdContent;

    return tocMdContent;
  }

  // Creates _toc.json and Toc ReadMe.md file
  function WriteToc(
    directoryPath: string,
    append: boolean,
    recursive: boolean
  ) {
    // Get files and folders, non-recursively
    let filesAndDirs: string[] = TocJsonLib.GetWikiFilesAndDirectories(
      directoryPath
    );

    if (recursive) {
      for (let fileAndDir of filesAndDirs) {
        let fileAndDirPath: string = path.join(directoryPath, fileAndDir);
        if (fs.lstatSync(fileAndDirPath).isDirectory()) {
          // Call resursive
          // Depth-First Search
          WriteToc(fileAndDirPath, append, recursive);
        }
      }
    }

    let tocJsonFilePath: string = TocJsonLib.WriteTocJson(
      directoryPath,
      append,
      /*recursive*/ false // Function is already recursing
    );

    let readMeTocContent: string = GenerateReadMeToc(tocJsonFilePath);

    fs.writeFileSync(path.join(directoryPath, "ReadMe.md"), readMeTocContent);
  }

  export function Main() {
    let yargsOptions = yargs
      .option("append", {
        alias: "a",
        default: true,
        description: "Append.",
      })
      .option("directory", {
        alias: "d",
        default: path.join(__dirname, '..', 'Content'),
        description: "Directory.",
      })
      .option("recursive", {
        alias: "r",
        default: true,
        description: "Recursive.",
      })
      .help().argv; // Enable --help

    WriteToc(
      yargsOptions.directory,
      yargsOptions.append,
      yargsOptions.recursive
    );
  }
}

Toc.Main();
