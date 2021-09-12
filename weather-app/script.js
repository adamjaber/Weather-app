const api = {
  key: "2900f7bc8b0ddb33b70a97d126906faa",
  base: "https://api.openweathermap.org/data/2.5/",
};
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    //console.log(searchbox.value);
  }
}
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  var now = new Date();
  var date = document.querySelector(".location .date");
  date.innerHTML = datebuilder(now);
  console.log("asd");
  let temp = document.querySelector('.current .temp');
  temp.innerHTML=`${Math.round(weather.main.temp).toFixed()}<span>°c</span>`;
 
  let weather_el=document.querySelector('.current .weather');
  weather_el.innerHTML = weather.weather[0].main;

  let hilow=document.querySelector('.hi-low');
  hilow.innerHTML=`${Math.round(weather.main.temp_min)}°c / 
  ${Math.round(weather.main.temp_max)}°c`;

}

function datebuilder(d) {
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
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullyear();
   return `${day} ${date} ${month} ${year}`;
}
