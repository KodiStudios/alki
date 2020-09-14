// Generates Table of Contents Json _toc.json file in specified directories

import * as yargs from "yargs"; // Process Arguments
import * as TocJsonLib from "./Assets/TocJsonLib";

// This namespace is required in order to have multiple Main functions
namespace WriteTocJson {
  export function Main() {
    let yargsOptions = yargs
      .option("append", {
        alias: "a",
        default: true,
        description: "Append.",
      })
      .option("directory", {
        alias: "d",
        default: ".",
        description: "Directory.",
      })
      .option("recursive", {
        alias: "r",
        default: false,
        description: "Recursive.",
      })
      .help().argv; // Enable --help

    TocJsonLib.WriteTocJson(yargsOptions.directory, yargsOptions.append, yargsOptions.recursive);
  }
}

WriteTocJson.Main();
