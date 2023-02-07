import * as child_process from "child_process";

// Namespace: Since it's already a module, there is no need for namespace

// Executes command and returns its output as array, single entry per line
export function Execute(command: string): string[] {
  let buffer: Buffer = child_process.execSync(command);
  let result: string[] = buffer.toString().split("\r\n");
  result.pop(); // Remove last, not needed
  return result;
}

// If string contains spaces, add double quotes around it
export function EnsureQuotes(s: string) {
  let result: string = s;
  if (s.indexOf(" ") > -1) {
    result = `"${result}"`;
  }

  return result;
}

// Non-Recursive
export function GetFilesAndDirectories(directoryPath: string): string[] {
  let files: string[] = Execute(
    `dir /b ${EnsureQuotes(directoryPath)}`
  );
  return files;
}

// Non-Recursive
export function GetDirectories(directoryPath: string): string[] {
  // /b Bare format (ho heading or summary)
  // /a Attributes
  // /a:d Directory
  let files: string[] = Execute(
    `dir /b /a:d ${EnsureQuotes(directoryPath)}`
  );
  return files;
}
