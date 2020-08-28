// Read _toc.json

import * as fs from "fs";
import * as path from "path";
import { argv } from "yargs"; // Process' Arguments

import * as GenerateTocJsonLib from "./Assets/GenerateTocJsonLib";

namespace Toc {

  // Creates Md Link out of string
  function ToMdLink(value: string) {
    let linkString: string = "";

    linkString = `[${value}](${value})`;

    return linkString;
  }

  function GenerateReadMeToc(tocJsonFilePath: string): string {
    let tocObject: any;

    if (fs.existsSync(tocJsonFilePath)) {
      tocObject = JSON.parse(fs.readFileSync(tocJsonFilePath).toString());
    } else {
      // Create empty object, so that toc is generated
      tocObject = new Object();
      tocObject.pages = [];
    }

    let leftoverFilesAndDirs: string[] = GenerateTocJsonLib.GetWikiFilesAndDirectories(
      path.dirname(tocJsonFilePath)
    );

    // Write toc.json
    let tocJsonContent: string = JSON.stringify(
      tocObject,
      /*replacer*/ null,
      /*indentation*/ 2
    );
    fs.writeFileSync(path.join(tocJsonFilePath), tocJsonContent);

    // Header Content
    let headerMdContent: string = fs
      .readFileSync(path.join(__dirname, "Assets", "TocHeader.md"))
      .toString();

    // Body content
    let tocMdContent: string = "";
    for (let pageName of tocObject.pages) {
      tocMdContent += ToMdLink(pageName);
      tocMdContent += "  \n"; // Note, double space is important, it creates new-line
    }

    tocMdContent = headerMdContent + tocMdContent;

    return tocMdContent;
  }

  // Creates Toc ReadMe.md file
  function WriteTocReadMeMd(directoryPath: string, recursive: boolean) {
    // Get files and folders, non-recursively
    let filesAndDirs: string[] = GenerateTocJsonLib.GetWikiFilesAndDirectories(
      directoryPath
    );

    if (recursive) {
      for (let fileAndDir of filesAndDirs) {
        let fullPath: string = path.join(directoryPath, fileAndDir);
        if (fs.lstatSync(fullPath).isDirectory()) {
          WriteTocReadMeMd(fullPath, recursive);
        }
      }
    }

    let readMeTocContent: string = GenerateReadMeToc(
      path.join(directoryPath, "_toc.json")
    );

    fs.writeFileSync(path.join(directoryPath, "ReadMe.md"), readMeTocContent);
  }

  function PrintHelp() {
    console.log("Usage:");
    console.log("ts-node-script " + __filename + " -d directory -r");
    console.log();
    console.log(
      "-d    Directory to scan. Optional. Default is current directory '.'"
    );
    console.log(
      "-r    Recursive. Optional. Default is false"
    );
  }

  export function Main() {
    const helpArg = argv.h;

    if (helpArg) {
      PrintHelp();
      return;
    }

    let directoryPath = argv.d as string;
    if (!directoryPath) {
      directoryPath = ".";
    }

    let recursive: boolean = argv.r as boolean;

    WriteTocReadMeMd(directoryPath, recursive);
  }
}

Toc.Main();
