namespace Foreach {
  function ShowCities() {
    let cities: Array<string> = new Array<string>();
    cities.push("Los Angeles");
    cities.push("Seattle");

    for (let city of cities) {
      console.log(city);
    }
  }

  export function Main() {
    ShowCities();
  }
}

Foreach.Main();
