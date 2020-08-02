// Read _toc.json

import * as fs from "fs";
import * as path from "path";

namespace Toc
{

    function GetLinkString(value: string)
    {
        let linkString: string = "";

        linkString = `[${value}](${value})`;

        return linkString;
    }

    function GenerateToc()
    {
        let tocObject: any;
        if (fs.existsSync("_toc.json"))
        {
            tocObject = JSON.parse(fs.readFileSync("_toc.json").toString());
        }
        else
        {
            // TODO: Generate Pages!
            tocObject = new Object();
            tocObject.pages = [];
        }
        
        let mdContent: string = "";
        for(let page of tocObject.pages)
        {
            mdContent += GetLinkString(page);
            mdContent += "  \n"; // Note, double space is important
        }

        let headerString: string = fs.readFileSync(path.join(__dirname, "TocHeader.md")).toString();
        mdContent = headerString + mdContent;
        fs.writeFileSync("ReadMe.md", mdContent);
    }

    export function Main()
    {
        GenerateToc();
    }
}

Toc.Main();