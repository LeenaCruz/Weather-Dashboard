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
          const length = data.list.length;
          console.log(length);

          for (let i = 0; i < length; i++) {
            const time = data.list[0].dt_txt.split(" ").pop();
            if (data.list[i].dt_txt.includes(time)) {
              const weather = {
                name: data.city.name,
                date: data.list[i].dt_txt,
                temp: data.list[i].main.temp,
                wind: data.list[i].wind.speed,
                humidity: data.list[i].main.humidity,
                weather: data.list[i].weather[0].main,

              }

              // const cityForecast = cityForecast + weather || []  ; 
              // cityForecast.push(weather);
              // console.log(cityForecast);

              const cityForecast = JSON.parse(localStorage.getItem("forecast")) || [];
              cityForecast.push(weather);
              localStorage.setItem("forecast", JSON.stringify(cityForecast));
              // console.log(weather);

              // return cityForecast;
            }


            // const today = dayjs().format('YYYY-MM-DD');
            // console.log(typeof today + " " + today);
            // const date = JSON.stringify(data.list[0].dt_txt.split(" ").slice(0, -1));
            // console.log(typeof date + " " + date);
            // if (data.list[i].dt_txt.includes(today)) {


            //   if (data.list[i]) {
            //   console.log("IF 0 Funciona")
            //   const dayWeather = document.getElementById('ciudad')
            //   const weatherCard = document.createElement('div');
            //   const cityNameEl = document.createElement('h2'); 
            //   const tempEl = document.createElement('p');
            //   const windEl = document.createElement('p');
            //   const humidityEl = document.createElement('p');

            //   cityNameEl.textContent = data.city.name;
            //   tempEl.textContent = data.list[0].main.temp;
            //   windEl.textContent = data.list[0].wind.speed;
            //   humidityEl.textContent = data.list[0].main.humidity;

            //   weatherCard.appendChild(cityNameEl);
            //   weatherCard.appendChild(tempEl);
            //   weatherCard.appendChild(windEl);
            //   weatherCard.appendChild(humidityEl);
            //   dayWeather.appendChild(weatherCard);

            // } else {
            //   const weatherCard = document.createElement('div');
            //   const cityNameEl = document.createElement('h2');
            //   const tempEl = document.createElement('p');
            //   const windEl = document.createElement('p');
            //   const humidityEl = document.createElement('p');

            //   cityNameEl.textContent = data.city.name;
            //   tempEl.textContent = data.list[i].main.temp;
            //   windEl.textContent = data.list[i].wind.speed;
            //   humidityEl.textContent = data.list[i].main.humidity;

            //   weatherCard.append(cityNameEl);
            //   weatherCard.append(tempEl);
            //   weatherCard.append(windEl);
            //   weatherCard.append(humidityEl);

            // }

          }
          const cityForecast = JSON.parse(localStorage.getItem("forecast"));

          const cityData = {
            name: data.city.name,
            lat: data.city.coord.lat,
            lon: data.city.coord.lon,
            cityForecast: cityForecast,
 

          }
          // localStorage.clear('forecast');
          localStorage.removeItem('forecast');
          console.log(cityData);

          // const cityForecast = JSON.parse(localStorage.getItem("forecast")) || [];
          const cities = JSON.parse(localStorage.getItem("cities")) || [];
          cities.push(cityData);
          localStorage.setItem("cities", JSON.stringify(cities));
          console.log(cities)
          createCard3();

        });

    });

  // console.log(JSON.parse(localStorage.getItem("cities")));

}

//Se me ocurre que puede tomar los ultimos 5 datos de local storage y renderizarlos
//o renderizar el nombre de la ciudad

function createCard3() {

  const cities = JSON.parse(localStorage.getItem("cities")) || [];
  console.log("Lista de ciudades")
  console.log(cities);

  const last = cities.pop();
  console.log(last);

  const dayWeather = document.getElementById('ciudad')
  const forecast = document.getElementById('forecast')
  const weatherCard = document.createElement('div');
  const cityNameEl = document.createElement('h2');
  const tempEl = document.createElement('p');
  const windEl = document.createElement('p');
  const humidityEl = document.createElement('p');
  const today = dayjs().format('YYYY-MM-DD');

  cityNameEl.textContent = searchInput.value + " " + today;
  tempEl.textContent = last.cityForecast[0].temp;
  windEl.textContent = last.cityForecast[0].wind;
  humidityEl.textContent = last.cityForecast[0].humidity;

  weatherCard.appendChild(cityNameEl);
  weatherCard.appendChild(tempEl);
  weatherCard.appendChild(windEl);
  weatherCard.appendChild(humidityEl);
  dayWeather.appendChild(weatherCard);

// Limpiar la carta anterior
}


// function createForecast(data) {

//   for (data of cities)


// }






function createCard2(card) {

  // const today = dayjs().format('YYYY-MM-DD');
  //           console.log(typeof today + " " + today);
  //           // const date = JSON.stringify(data.list[0].dt_txt.split(" ").slice(0, -1));
  //           // console.log(typeof date + " " + date);

  //           if (data.list[i].dt_txt.includes(today)) {
  //             if (data.list[0]) {
  //             console.log("IF 0 Funciona")
  // const dayWeather = document.getElementById('ciudad')
  const weatherCard = document.createElement('div');
  const cityNameEl = document.createElement('h2');
  const tempEl = document.createElement('p');
  const windEl = document.createElement('p');
  const humidityEl = document.createElement('p');

  cityNameEl.textContent = card.city.name;
  tempEl.textContent = card.list[0].main.temp;
  windEl.textContent = card.list[0].wind.speed;
  humidityEl.textContent = card.list[0].main.humidity;

  weatherCard.appendChild(cityNameEl);
  weatherCard.appendChild(tempEl);
  weatherCard.appendChild(windEl);
  weatherCard.appendChild(humidityEl);
  // dayWeather.appendChild(weatherCard);






  // return weatherCard;


}

function renderWeatherCards() {
  const forecast = JSON.parse(localStorage.getItem("forecast")) || [];
  const dayWeatherEl = document.getElementById('ciudad');
  const forecastEL = document.getElementById('forecastCards')


  for (let i = 0; i < forecast.length; i++) {
    if (forecast.list[i].dt_txt === "0") {
      dayWeatherEl.append(createCard2(card));
    } else {
      forecastEL.append(createCard2(card));
    }






  }











}


// function createCard(data) {
//   // cardData = JSON.parse(localStorage.getItem("forecast"));
//   // const length = cardData.length-1;
//   // console.log(length);
//   // if  i = 0 poner ne ciudad div 
//   //else poner en 5 day forecast 
//   const today = dayjs();

//   if (data.list[0].dt_txt.split(" ").slice(0, -1) === today) {
//     console.log("IF 0 Funciona")
//     const dayWeather = document.getElementById('ciudad')
//     const weatherCard = document.createElement('div');
//     const cityNameEl = document.createElement('h2');
//     const tempEl = document.createElement('p');
//     const windEl = document.createElement('p');
//     const humidityEl = document.createElement('p');

//     cityNameEl.textContent = data.city.name;
//     tempEl.textContent = data.list[0].main.temp;
//     windEl.textContent = data.list[0].wind.speed;
//     humidityEl.textContent = data.list[0].main.humidity;

//     weatherCard.appendChild(cityNameEl);
//     weatherCard.appendChild(tempEl);
//     weatherCard.appendChild(windEl);
//     weatherCard.appendChild(humidityEl);
//     dayWeather.appendChild(weatherCard);

//   } else {
//     const weatherCard = document.createElement('div');
//     const cityNameEl = document.createElement('h2');
//     const tempEl = document.createElement('p');
//     const windEl = document.createElement('p');
//     const humidityEl = document.createElement('p');

//     cityNameEl.textContent = data.city.name;
//     tempEl.textContent = data.list[i].main.temp;
//     windEl.textContent = data.list[i].wind.speed;
//     humidityEl.textContent = data.list[i].main.humidity;

//     weatherCard.append(cityNameEl);
//     weatherCard.append(tempEl);
//     weatherCard.append(windEl);
//     weatherCard.append(humidityEl);

//   }


// }


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