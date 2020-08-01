import * as fs from 'fs'; // File Manipulation
import {argv} from 'yargs'; // Process' Arguments
import * as child_process from 'child_process';
import * as path from 'path';

namespace TocPages
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

    function GetFilesAndDirectories(directoryPath: string): string[]
    {
        let files: string[] = Execute(`dir /b ${EnsureQuotes(directoryPath)}`);
        return files;
    }

    function MakeTocJson(directoryPath: string): string
    {
        // Read Files
        let files: string[] = GetFilesAndDirectories(directoryPath);

        let tocObject: any = new Object();

        let pages: string[] = [];

        for(let file of files)
        {
            if (!file[0].startsWith('_'))
            {
                pages.push(file);
            }
        }

        tocObject.pages = pages;

        // let result
        // for(let f of files)
        // {
        //     fs.lstatSync(path.join(directoryPath, f)).isDirectory();
        // }

        return JSON.stringify(tocObject);
    }

    function GenerateTocJson(directoryPath: string)
    {
        let fileName: string = "_toc.json";

        let tocString: string = MakeTocJson(directoryPath);
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

TocPages.Main();