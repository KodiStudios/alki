import * as yargs from "yargs"; // Process Arguments

import * as GenerateTocJsonLib from "./Assets/GenerateTocJsonLib";

// This namespace is required in order to have multiple Main funcitons
namespace GenerateTocJson {
  export function Main() {
    let args = yargs
      .option("append", {
        alias: "a",
        default: true,
        demand: false,
        description: "Append. Optional. Default true",
      })
      .option("directory", {
        alias: "d",
        default: ".",
        demand: false,
        description: "Directory. Optional. Default '.'",
      })
      .option("recursive", {
        alias: "r",
        default: false,
        demand: false,
        description: "Recursive. Optional. Default false",
      })
      .help().argv; // Enable --help

    GenerateTocJsonLib.WriteTocJson(args.directory, args.append, args.recursive);
  }
}

GenerateTocJson.Main();
