const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('ciudadInput')
const requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
const APIKey = '4527ed5e22cd18768af91f242a69b9a2';
// const lat = ;
// const lon = ;
// function getWeather () {



function getCoords() {
  const city = ciudadInput.value;
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const coordinates = {
        name: data[0].name,
        lat: data[0].lat,
        lon: data[0].lon,
      }
      // console.log(coordinates)\
      // coords = localStorage.setItem("coordinates", JSON.stringify(coordinates));
      // Creates and array of coordinates
      const cityList = JSON.parse(localStorage.getItem("coordinates")) || [];
      cityList.push(coordinates);
      localStorage.setItem("coordinates", JSON.stringify(cityList));



      // localStorage.setItem("coordinates", JSON.stringify(coordinates));

      console.log(cityList);
    });

  // return cityList;
  getWeather()

}



function getWeather() {

  // getCoords();
  const coords = JSON.parse(localStorage.getItem("coordinates"));
  console.log(coords);

  // esta agarrando el ultimo registro de local Storage, quiero que agarre el del input
  // const number = coords.length;
  // let coords = getCoords();
  // const cityData = coords[number-1];
  // console.log(typeof cityData + " " + cityData);
  // console.log(cityData);
  // const lat = JSON.stringify(coords.lat);
  // const lon = JSON.stringify(coords.lon);

  const newCity = coords.length - 1;
  console.log(typeof newCity + " " + newCity);

  const lat = coords[newCity].lat;
  const lon = coords[newCity].lon;
  console.log(typeof lat + " " + lat);
  console.log(typeof lon + " " + lon);
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        const weather = {
          name: data.city.name,
          date: data.list[i].dt_txt,
          temp: data.list[i].main.temp,
          wind: data.list[i].wind.speed,
          lat: data.city.coord.lat,

        }

        const cityForecast = JSON.parse(localStorage.getItem("forecast")) || [];
        cityForecast.push(weather);
        localStorage.setItem("forecast", JSON.stringify(cityForecast));
        // console.log(weather);
      }
    });
  // createCard();
  searchInput.value = "";

}




function getWeatherGOD() {


  const city = ciudadInput.value;
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const coordinates = {
        name: data[0].name,
        lat: data[0].lat,
        lon: data[0].lon,
      }
      // console.log(coordinates)\
      // coords = localStorage.setItem("coordinates", JSON.stringify(coordinates));
      // Creates and array of coordinates
      const cityList = JSON.parse(localStorage.getItem("coordinates")) || [];
      cityList.push(coordinates);
      localStorage.setItem("coordinates", JSON.stringify(cityList));
      // localStorage.setItem("coordinates", JSON.stringify(coordinates));
      console.log(cityList);
      return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);

          for (let i = 0; i < data.length; i++) {
            const weather = {
              name: data.city.name,
              date: data.list[i].dt_txt,
              temp: data.list[i].main.temp,
              wind: data.list[i].wind.speed,
              lat: data.city.coord.lat,
            }

            const cityForecast = JSON.parse(localStorage.getItem("forecast")) || [];
            cityForecast.push(weather);
            localStorage.setItem("forecast", JSON.stringify(cityForecast));
            // console.log(weather);
          }

        });
      // createCard();

    });
  }


  function createCard(weather) {
    const weatherCard = $('<div>');
    const cityNameEl = $('<h2>').textcontent(weather.name)
    weatherCard.append(cityNameEl)


  }


  // funciona con otro API :(

  // function getWeather() {


  //   const city = ciudadInput.value;
  //   fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=${APIKey}`)
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       console.log(data);

  //       // Luego hago esto para mostrar solo el tiempo
  //       const time = data.list[0].dt_txt.split(" ").pop();

  //       console.log(time)
  //       // Recuerda hacer split a la fecha  split (" "). slice(0,-1) cuando crees cartas

  //       for (let i = 0; i < data.list.length; i++) {

  //         if (data.list[i].dt_txt.includes(time)) {

  //           const weather = {
  //             name: data.city.name,
  //             date: data.list[i].dt_txt,
  //             temp: data.list[i].main.temp,
  //             wind: data.list[i].wind.speed,
  //             lat: data.city.coord.lat,
  //           }

  //           const cityForecast = JSON.parse(localStorage.getItem("forecast")) || [];
  //           cityForecast.push(weather);
  //           localStorage.setItem("forecast", JSON.stringify(cityForecast));

  //         }

  //       }
  //     });
  //   // createCard();
  //   searchInput.value = "";
  // }















  searchBtn.addEventListener('click', getWeatherGOD);