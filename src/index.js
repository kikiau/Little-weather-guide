let now = new Date();

let date = now.getDate();
let hours = twoDigits(now.getHours());
let minutes = twoDigits(now.getMinutes());
let year = now.getFullYear();

let days = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
let day = days[now.getDay()];

let months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];
let month = months[now.getMonth()];

let currentDate = document.querySelector("h1");
let cityResult = document.querySelector("#search-bar");
let country = document.querySelector("h2");
let finalTemp = document.querySelector("#temp");
let form = document.querySelector("#citySubmit-form");
let apiKey = "41f9a4184564dfbef33835731791c2b2";
let units = "metric";
function endResult(response) {
  let endTemp = Math.round(response.data.main.temp);
  finalTemp.innerHTML = `${endTemp}`;
}

function search(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityResult.value}&appid=${apiKey}&units=${units}`;
  country.innerHTML = `${cityResult.value}`;
  axios.get(apiUrl).then(endResult);
}

function showTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  finalTemp.innerHTML = `${currentTemp}`;
  let currentCity = response.data.name;
  country.innerHTML = `${currentCity}`;
}
let currentLocationButton = document.querySelector("#currentlocation-bar");
currentLocationButton.addEventListener("click", currentLocation);

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(locationUrl).then(showTemp);
}

function twoDigits(value) {
  if (value < 10) {
    return `0${value}`;
  } else {
    return value;
  }
}

currentDate.innerHTML = `${date} ${month} ${year} ${day} ${hours}:${minutes}`;
form.addEventListener("submit", search);
