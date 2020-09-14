namespace Async {

    async function CreateGreeting(name: string): Promise<string> {
        // Simulate actual async operation:
        return new Promise<string>((resolve) => {
            let result: string = "Hello " + name;
            resolve(result);
        });
    }

    async function ShowGreetings() {
        let greeting1: string = await CreateGreeting("Tiger");
        console.log(greeting1);

        let greeting2: string = await CreateGreeting("Dolphin");
        console.log(greeting2);
    }

    export async function Main() {
        await ShowGreetings();
    }

}

Async.Main();
