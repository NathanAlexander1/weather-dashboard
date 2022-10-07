var APIkey = "bbe39981906fc124cb49051c48a89934";

var city = "Seattle";

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city+ "&appid=" + APIkey;

fetch(queryURL, {

  cache: 'reload',
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.wind.speed);
  });