namespace AsyncAdvanced {
  // Await Async Direct Pattern
  async function CreateGreeting1(name: string): Promise<string> {
    // Note, this is not async, however
    // Typescript will wrap it into async signature
    let result: string = "Hello " + name + " from Async Direct Pattern!";
    return result;
  }

  // Await Async Pattern
  async function ShowGreetings1() {
    let asyncGreeting: string = await CreateGreeting1("Michael");
    console.log(asyncGreeting);
  }

  // Explicit Promise Pattern
  function CreateGreeting2(name: string): Promise<string> {
    return new Promise<string>((resolve) => {
      let result: string = "Hello " + name + " from Explicit Promise Pattern!";
      resolve(result);
    });
  }

  function ShowGreetings2() {
    CreateGreeting1("Peter").then((result1: string) => {
      console.log(result1);
    });
  }

  // Interchangeable
  async function ShowGreetings3() {
    CreateGreeting1("Alex").then((result3_1: string) => {
      console.log(result3_1);
    });

    let result3: string = await CreateGreeting2("Roma");
    console.log(result3);
  }

  export async function Main() {
    await ShowGreetings1();
    ShowGreetings2();
    await ShowGreetings3();
  }
}

AsyncAdvanced.Main();
