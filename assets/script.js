const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('ciudadInput')
const requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
const APIKey = '4527ed5e22cd18768af91f242a69b9a2';

function generateId() {
  // Generates a random number between 0 an 1, multiplies it by 100000000 then adds 10000000 to generate a number between 10000000 and 10999999.
  const random = Math.floor(Math.random() * 100000000) + 10000000;
  console.log(random);
  return random;
}





function getWeatherGOD() {

  const city = ciudadInput.value;
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const coordinates = {
        name: data[0].name,
        lat: data[0].lat,
        lon: data[0].lon,
      }
      // Creates and array of coordinates
      const cityList = JSON.parse(localStorage.getItem("coordinates")) || [];
      cityList.push(coordinates);
      localStorage.setItem("coordinates", JSON.stringify(cityList));
      console.log(cityList);
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const date = data.dt * 1000;
          const dateTime = dayjs(date).format("YYYY-MM-DD");
          console.log(dateTime);
          const today = {
            name: data.name,
            date: dateTime,
            temp: data.main.temp,
            wind: data.wind.speed,
            humidity: data.main.humidity,
            weather: data.weather[0].main,
            weatherId: data.weather[0].id,
          }
          localStorage.removeItem('today');
          const todayWeather = JSON.parse(localStorage.getItem("today")) || [];
          todayWeather.push(today);
          localStorage.setItem('today', JSON.stringify(todayWeather));

          createTodayCard();

          return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIKey}&units=imperial`)
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
                    weatherId: data.list[i].weather[0].id,

                  }
                  const cityForecast = JSON.parse(localStorage.getItem("forecast")) || [];
                  cityForecast.push(weather);
                  localStorage.setItem("forecast", JSON.stringify(cityForecast));
                }
              }
              const cityForecast = JSON.parse(localStorage.getItem("forecast"));
              const todayWeather = JSON.parse(localStorage.getItem("today"));
              const id = generateId();
              const cityData = {
                id: id,
                name: data.city.name,
                lat: data.city.coord.lat,
                lon: data.city.coord.lon,
                todayWeather: todayWeather,
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
              createForecast();
              addToHistory();

            });
        });
    });

  // console.log(JSON.parse(localStorage.getItem("cities")));

}


function addToHistory() {
  const citiesHistory = JSON.parse(localStorage.getItem("cities")) || [];
  console.log(citiesHistory);
  const lastCity = citiesHistory.pop();
  const historyEl = document.getElementById('results');

  const cityEl = document.createElement('div');
  const cityNameEl = document.createElement('button');

  cityNameEl.setAttribute("class", "button history");
  cityNameEl.setAttribute("id", lastCity.id);
  cityNameEl.textContent = lastCity.name,

    cityEl.append(cityNameEl);
  historyEl.append(cityEl);

  return cityNameEl;

}

function showForecast() {
const id = addToHistory;
const realId = id.id;
console.log(realId)
console.log (id);
  console.log("Si funciono")



}


function createTodayCard() {
  const today = JSON.parse(localStorage.getItem("today")) || [];
  console.log(today)
  const dayWeather = document.getElementById('ciudadCards')
  const weatherCard = document.createElement('div');
  const cityNameEl = document.createElement('h2');
  const tempEl = document.createElement('p');
  const windEl = document.createElement('p');
  const humidityEl = document.createElement('p');

  dayWeather.innerHTML = " ";

  cityNameEl.textContent = today[0].name + " " + today[0].date;
  tempEl.textContent = "Temp:" + " " + today[0].temp + " °F";
  windEl.textContent = "Wind:" + " " + today[0].wind + " MPH";
  humidityEl.textContent = "Humidity:" + " " + today[0].humidity + " %";

  weatherCard.setAttribute("class", "dayWeather");

  weatherCard.appendChild(cityNameEl);
  weatherCard.appendChild(tempEl);
  weatherCard.appendChild(windEl);
  weatherCard.appendChild(humidityEl);
  dayWeather.appendChild(weatherCard);
}

function createForecast() {

  const cities = JSON.parse(localStorage.getItem("cities")) || [];
  console.log("Lista de ciudades")
  console.log(cities);
  const last = cities.pop();
  console.log(last);

  const cityForecast = last.cityForecast;
  console.log(cityForecast)

  const forecast = document.getElementById('forecastCards')
  forecast.innerHTML = " ";
  for (let i = 0; i < cityForecast.length; i++) {

    const weatherCard = document.createElement('div');
    const cityNameEl = document.createElement('h2');
    const iconEl = document.createElement('div');
    const tempEl = document.createElement('p');
    const windEl = document.createElement('p');
    const humidityEl = document.createElement('p');

    const weatherClass = cityForecast[i].weatherId;
    // console.log(typeof weatherClass + " " + weatherClass);

    cityNameEl.textContent = cityForecast[i].date.split(" ").slice(0, -1);
    tempEl.textContent = "Temp:" + " " + cityForecast[i].temp + " °F";
    windEl.textContent = "Wind:" + " " + cityForecast[i].wind + " MPH";
    humidityEl.textContent = "Humidity:" + " " + cityForecast[i].humidity + " %";

    const thunderstorm = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
    const drizzle = [300, 301, 302, 310, 311, 312, 313, 314, 321];
    const rain = [500, 501, 502, 503, 504];
    const freezingRain = [501];
    const heavyRain = [520, 521, 522, 531];
    const snow = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622];
    const atmosphere = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
    const clear = [800];
    const clouds = [801, 802, 803, 804];

    if (thunderstorm.includes(weatherClass)) {
      iconEl.setAttribute("class", "thunderstorm");
    } else if (drizzle.includes(weatherClass)) {
      iconEl.setAttribute("class", "drizzle");
    } else if (rain.includes(weatherClass)) {
      iconEl.setAttribute("class", "rain");
    } else if (freezingRain.includes(weatherClass)) {
      iconEl.setAttribute("class", "freezingRain");
    } else if (heavyRain.includes(weatherClass)) {
      iconEl.setAttribute("class", "heavyRain");
    } else if (snow.includes(weatherClass)) {
      iconEl.setAttribute("class", "snow");
    } else if (atmosphere.includes(weatherClass)) {
      iconEl.setAttribute("class", "atmosphere");
    } else if (clear.includes(weatherClass)) {
      iconEl.setAttribute("class", "clear");
    } else if (clouds.includes(weatherClass)) {
      iconEl.setAttribute("class", "clouds");
    }



    weatherCard.setAttribute("class", "cards");

    weatherCard.appendChild(cityNameEl);
    weatherCard.appendChild(iconEl);
    weatherCard.appendChild(tempEl);
    weatherCard.appendChild(windEl);
    weatherCard.appendChild(humidityEl);
    forecast.appendChild(weatherCard);
  }
}
searchBtn.addEventListener('click', getWeatherGOD);


// const cityNameEl = addToHistory();
const cityNameEl = document.getElementById('results');

// cityNameEl.addEventListener('click', showForecast);

cityNameEl.addEventListener('click', function () {
  console.log(this.id);
});
