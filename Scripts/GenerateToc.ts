// Read _toc.json

import * as fs from "fs";
import * as path from "path";

namespace Toc
{
    function GenerateToc()
    {
        // Read _toc
    }

    function GetLinkString(value: string)
    {
        let linkString: string = "";

        linkString = `[${value}](${value})`;

        return linkString;
    }

    export function Main()
    {
        let tocObject: any = JSON.parse(fs.readFileSync("_toc.json").toString());
        
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
}

Toc.Main();