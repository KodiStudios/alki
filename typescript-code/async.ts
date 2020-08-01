namespace Async {

    async function CreateGreeting(name: string): Promise<string> {
        return new Promise<string>((resolve) => {
            let result: string = "Hello " + name;
            resolve(result);
        });
    }

    async function ShowGreetings() {
        let nikoGreeting: string = await CreateGreeting("Niko");
        console.log("nikoGreeting: " + nikoGreeting);

        let dimaGreeting: string = await CreateGreeting("Dima");
        console.log("dimaGreeting: " + dimaGreeting);
    }

    export async function Main() {
        await ShowGreetings();
    }

}

Async.Main();
