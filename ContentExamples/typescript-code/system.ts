namespace System {
  function ShowExecutionPaths() {
    console.log("Current script file path: " + __filename);
    console.log("Directory path of current script: " + __dirname);
  }

  export function Main() {
    ShowExecutionPaths();
  }
}

System.Main();
