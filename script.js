var APIkey = "bbe39981906fc124cb49051c48a89934";
var todayNameDate = $("#today-name-date");
var todaysWeatherInfo = $("#todays-weather-info");
var containerForFiveDay = $("#container-for-five-day");
var cityNameInput = $("#cityNameInput");
var searchCities = $("#search-cities");
var listContainer = $("#searchList");

// var savedCityNames = [];

function searchForCityAPI(cityName) {
  //clear input
  $("#todays-weather-info").empty();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIkey +
    "&units=imperial";
  fetch(queryURL, {
    cache: "reload",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      todaysWeatherInfo.append(
        `<div class = "border p-2 bg-dark text-white"><h2>${
          data.name
        }, ${moment().format(
          "ddd MMM DD, YYYY"
        )}<img src = "https://openweathermap.org/img/wn/${
          data.weather[0].icon
        }.png"></img></h2><p>Temp: <span>${Math.floor(
          data.main.temp
        )} °F</span></p><p>Wind Speed: <span>${
          data.wind.speed
        } MPH</span></p><p>Humidity: <span>${
          data.main.humidity
        }%</span></p></div>`
      );

      //going to call getUVIndex function
    });
  cityNameInput.val("");
  //create a functionCreateHTMLCards that will, when called, will display the 5day forcast and save city name to list
  function displayFiveDay() {
    $(containerForFiveDay).empty();
    //example of temperate literals
    var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`;

    fetch(fiveDayURL, {
      cache: "reload",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        var arrayOfForcastDay = data.list;
        // console.log(arrayOfForcastDay);

        for (var i = 1; i < arrayOfForcastDay.length; i += 8) {
          var currentForcastIndex = arrayOfForcastDay[i];
          // console.log(currentForcastIndex)
          var currentIcon = currentForcastIndex.weather[0].icon;
          // console.log(currentIcon);

          //append new container to'(container-for-five-day)
          containerForFiveDay.append(
            `<div class = "col-x-2 col-lg-2 col-md-2 col-sm-12 col-8 border border-secondary m-1 bg-dark text-white"><h6>${moment(
              currentForcastIndex.dt_txt
            ).format(
              "ddd MMM DD, YYYY"
            )}<img src = "https://openweathermap.org/img/wn/${currentIcon}.png"></img></h6><p>Temp: <span>${Math.floor(
              currentForcastIndex.main.temp
            )} °F</span></p><p>Wind Speed: <span>${
              currentForcastIndex.wind.speed
            } MPH</span></p><p>Humidity: <span>${
              currentForcastIndex.main.humidity
            }%</span></p></div>`
          );
        }
      });
  }
  displayFiveDay();

  saveCity(cityName);
}

function saveCity(inputValue) {
  //empties the buttons already printed to avoid duplicating each time a new buttons is added
  listContainer.empty();
  //this is the array that saved cities will be pushed to
  var savedCityNames = JSON.parse(localStorage.getItem("cityname")) || [];

  console.log(savedCityNames);
  var uniqueEl = $.unique(savedCityNames);
  console.log(uniqueEl);

  if (savedCityNames.indexOf(inputValue.toLowerCase()) == -1) {
    savedCityNames.push(inputValue.toLowerCase());
    localStorage.setItem("cityname", JSON.stringify(savedCityNames));

  }
  for (var j = 0; j < savedCityNames.length; j++) {
    var currentCityName = savedCityNames[j];
    listContainer.append(
      `<button class='col btn btn-secondary btn-block selector'>${currentCityName}</button>`
    );
  }
  // // console.log(savedCityNames);

}

// $(".selector").on("click", searchForCityAPI($("#currentCityName").innerHTML));

listContainer.on("click", function (event) {
  var target = event.target;
//   console.log(target.nodeName);
  if (target.nodeName === "BUTTON") {
    searchForCityAPI(target.innerHTML);
  }
});

//on click, a series of functions are called to display today's weather and a 5 days forcast. In addition, previously searched cities are displayed as buttons that can be re-clicked to bring that city's weather
searchCities.on("submit", function searchCities(event) {
  event.preventDefault();
  var userSearchValue = cityNameInput.val();
  searchForCityAPI(userSearchValue);
  // console.log(userSearchValue);
});
