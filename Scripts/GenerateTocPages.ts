// Read _toc.json

import * as fs from "fs";
import * as path from "path";

import * as GenerateTocJsonLib from "./GenerateTocJsonLib";

namespace Toc
{

    function GetLinkString(value: string)
    {
        let linkString: string = "";

        linkString = `[${value}](${value})`;

        return linkString;
    }

    function GenerateTocPage(directoryPath: string)
    {
        console.log("GenerateTocPage");
        let tocObject: any;
        let tocFilePath = path.join(directoryPath, "_toc.json");
        console.log("tocFilePath:" + tocFilePath);
        if (fs.existsSync(tocFilePath))
        {
            console.log("tocFilePath exists");
            tocObject = JSON.parse(fs.readFileSync(tocFilePath).toString());
            console.log("tocObject pages length:" + tocObject.pages.length);
        }
        else
        {
            // TODO: Generate Pages!
            tocObject = new Object();
            tocObject.pages = [];
        }

        let leftoverFiles: string[] = GenerateTocJsonLib.TocPages.ScanDirectory(directoryPath);

        // Find all files which are NOT part of tocObject
        //let leftoverFiles: string[] = [];

        for(let leftoverFile of leftoverFiles)
        {
            console.log("LeftoverFile: " + leftoverFile);
            if (!tocObject.pages.includes(leftoverFile))
            {
                console.log("Adding Page: " + leftoverFile);
                tocObject.pages.push(leftoverFile);
            }
        }


        let tocString: string = JSON.stringify(tocObject, null, /*indentation*/ 2);
        fs.writeFileSync(path.join(tocFilePath), tocString);

        let mdContent: string = "";
        for(let page of tocObject.pages)
        {
            mdContent += GetLinkString(page);
            mdContent += "  \n"; // Note, double space is important
        }

        let headerString: string = fs.readFileSync(path.join(__dirname, "TocHeader.md")).toString();
        mdContent = headerString + mdContent;

        return mdContent;
    }

    function GenerateTocPages(directoryPath: string)
    {
        // Recursively

        console.log("GenerateTocPages");

        // Get files and folders
        let filesAndDirs: string[] = GenerateTocJsonLib.TocPages.GetFilesAndDirectories(directoryPath);
        
        for (let fileAndDir of filesAndDirs)
        {
            let fullPath: string = path.join(directoryPath, fileAndDir);
            if (fs.lstatSync(fullPath).isDirectory())
            {
                GenerateTocPages(fullPath);
            }
        }

        let mdContent:string = GenerateTocPage(directoryPath);
        fs.writeFileSync(path.join(directoryPath, "ReadMe.md"), mdContent);
    }

    export function Main()
    {
        console.log("Main");
        GenerateTocPages(/*directoryPath*/ ".");
    }
}

Toc.Main();