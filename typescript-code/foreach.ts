namespace Foreach {

function Foreach_Of()
{
    let cities: Array<string> = new Array<string>();
    cities.push("Los Angeles");
    cities.push("Seattle");

    for (let city of cities)
    {
        console.log(city);
    }
}

export function Main()
{
    Foreach_Of();
}

}

Foreach.Main();