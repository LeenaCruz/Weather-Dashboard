const searchBtn = document.getElementById('searchBtn');
const requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
const APIKey = '4527ed5e22cd18768af91f242a69b9a2';
// const lat = ;
// const lon = ;
// function getWeather () {

fetch('http://api.openweathermap.org/data/2.5/forecast?lat=rr.34&lon=10.99&appid=4527ed5e22cd18768af91f242a69b9a2')
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
});

// }

// searchBtn.addEventListener('click', getWeather);
