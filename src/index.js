let now = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let year = now.getFullYear();

let h2 = document.querySelector(".today");
h2.innerHTML = `${weekDays[now.getDay()]} ${now.getDate()} ${
  months[now.getMonth()]
} ${year}, ${hour}:${minute}`;

//Bonus
function celsiusToFahrenheit() {
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = `20`;
}

function fahrenheitToCelsius() {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `68`;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitToCelsius);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusToFahrenheit); //

//Week5 SearchEngine
function showTemperature(response) {
  document.querySelector(".current-temperature").innerHTML = response.data.name;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let searchInput = document.querySelector("#search-text-input").value;
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput;

  axios.get(`${apiUrl}`).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}
function handlePosition(position) {
  let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector(".current");
button.addEventListener("click", getCurrentLocation);

searchCity("Barcelona");
