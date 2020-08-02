import * as fs from 'fs'; // File Manipulation
import * as child_process from 'child_process';
import * as path from 'path';
import {argv, string} from 'yargs'; // Process' Arguments

export namespace TocPages
{
    function PrintHelp()
    {
        console.log("Usage:");
        console.log("ts-node-script " + __filename + " -d directoryPathToScan");
        return;
    }

    function Execute(command: string): string[]
    {
        // console.log("command: " + command);
        let buffer: Buffer = child_process.execSync(command);
        let result: string[] = buffer
            .toString()
            .split('\r\n');
        result.pop(); // Remove last, not needed
        return result;
    }

    function EnsureQuotes(s: string)
    {
        let result: string = s;
        if (s.indexOf(' ') > -1)
        {
            result = `"${result}"`;
        }

        return result;
    }

    export function GetFilesAndDirectories(directoryPath: string): string[]
    {
        let files: string[] = Execute(`dir /b ${EnsureQuotes(directoryPath)}`);
        return files;
    }

    export function ScanDirectory(directoryPath: string): string[]
    {
        // Read Files
        let files: string[] = GetFilesAndDirectories(directoryPath);

        let pages: string[] = [];

        for(let file of files)
        {
            if (!file[0].startsWith('_')
                && file.toUpperCase() !== "ReadMe.md".toUpperCase())
            {
                pages.push(file);
            }
        }

        return pages;
    }

    export function WriteTocJson()
    {

    }

    export function GenerateTocJson(directoryPath: string)
    {
        let tocObject: any = new Object();
        tocObject.pages = ScanDirectory(directoryPath);

        // let result
        // for(let f of files)
        // {
        //     fs.lstatSync(path.join(directoryPath, f)).isDirectory();
        // }

        let fileName: string = "_toc.json";

        let tocString: string = JSON.stringify(tocObject, null, /*indentation*/ 2);
        fs.writeFileSync(path.join(fileName), tocString);
    }

    export function Main()
    {
        const helpArg = argv.h;
        if (helpArg)
        {
            PrintHelp();
            return;
        }

        let directoryPath = argv.d as string;
        if (!directoryPath)
        {
            directoryPath = ".";
        }

        GenerateTocJson(directoryPath);
    }
}
