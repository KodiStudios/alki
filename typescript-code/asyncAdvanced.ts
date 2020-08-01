namespace AsyncAdvanced
{
async function CreateGreeting1(name: string): Promise<string>
{
    let result: string = "Hello " + name + " from Simple Async!";
    return result;
}

function CreateGreeting2(name: string): Promise<string>
{
    return new Promise<string>((resolve) => {
        let result: string = "Hello " + name + " from Explicit Promise!";
        resolve(result);
    });
}

async function ShowGreetings1() {
    let result1: string = await CreateGreeting1("Niko");
    console.log("result1: " + result1);

    let result2: string = await CreateGreeting2("Niko");
    console.log("result2: " + result2);
}

function ShowGreetings2()
{
    CreateGreeting1("Dima").then((result1: string) => {
        console.log("result1: " + result1);
    });

    CreateGreeting2("Dima").then((result2: string) => {
        console.log("result2: " + result2);
    });
}

export async function Main()
{
    await ShowGreetings1();
    ShowGreetings2();
}

}

Async.Main();
