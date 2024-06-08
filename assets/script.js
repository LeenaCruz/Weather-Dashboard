const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('ciudadInput')
const requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
const APIKey = '4527ed5e22cd18768af91f242a69b9a2';
// const lat = ;
// const lon = ;
// function getWeather () {



function getCoords() {
  const city = ciudadInput.value;
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${APIKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      const coordinates = {
        name: data[0].name,
        lat: data[0].lat,
        lon: data[0].lon,
      }
      // console.log(coordinates)\
      // coords = localStorage.setItem("coordinates", JSON.stringify(coordinates));
      let cityList = JSON.parse(localStorage.getItem("coordinates")) || [];
      cityList.push(coordinates);
      localStorage.setItem("coordinates", JSON.stringify(cityList));
      // console.log(cityList);
    });

// return cityList;
getWeather()
 
}



function getWeather() {

  // getCoords();
  const coords = JSON.parse(localStorage.getItem("coordinates"));
  // console.log (coords);

  // esta agarrando el ultimo registro de local Storage, quiero que agarre el del input
const number = coords.length;
  // let coords = getCoords();
  const cityData = coords[number-1];
  // console.log(typeof cityData + " " + cityData);
  // console.log(cityData);
  const lat = cityData.lat;
  const lon = cityData.lon;
  // console.log(typeof lat + " " + lat);
  // console.log(typeof lon + " " + lon);
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      const weather = {
        name: data.city.name,
        temp: data.list[0].main.temp,
        wind: data.list[0].wind.speed,
        lat: data.city.coord.lat,
      }

      console.log (weather);

    });
  }
    // createCard();
    searchInput.value = "";


// function createCard (weather) {
// const weatherCard = $('<div>');
// const cityNameEl = $('<h2>').textcontent(weather.name)
// weatherCard.append(cityNameEl)


// }


searchBtn.addEventListener('click', getCoords);
