var APIkey = "bbe39981906fc124cb49051c48a89934";
var todayNameDate = $("#today-name-date")
// var todayPlusOne = $("#todayPlusOne")
// var todayPlusTwo = $("#todayPlusTwo")
// var todayPlusThree = $("#todayPlusThree")
// var todayPlusFour = $("#todayPlusFour")
// var todayPlusFive = $("#todayPlusFive")
var todaysWeatherInfo = $("#todays-weather-info");
var containerForFiveDay = $("#container-for-five-day");
var today = todayNameDate.text(moment().format("dddd MMM Mo YYYY"));
// todayPlusOne.text(moment().add(1, "days").calendar())
// todayPlusTwo.text(moment().add(2, "days").calendar())
// todayPlusThree.text(moment().add(3, "days").calendar())
// todayPlusFour.text(moment().add(4, "days").calendar())
// todayPlusFive.text(moment().add(5, "days").calendar())

var cityNameInput = $('#cityNameInput');
var searchCities = $("#search-cities");
var listContainer = $("#searchList");


function searchForCityAPI(cityName) {
    //clear input
    $("#todays-weather-info").empty();
    var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "&appid=" +
  APIkey + "&units=imperial";
    fetch(queryURL, {
    cache: "reload",
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        // todaysWeatherInfo.append(`<h2>${data.name}</h2>`)
        // todaysWeatherInfo.append(`<p>Temp: <span>${Math.floor(data.main.temp)} °F</span></p>`)
        // todaysWeatherInfo.append(`<p>Wind Speed: <span>${(data.wind.speed)} MPH</span></p>`)
        // todaysWeatherInfo.append(`<p>Humidity: <span>${(data.main.humidity)}%</span></p>`)

        todaysWeatherInfo.append(`<div class = "border p-2"><h2>${data.name}</h2><p>Temp: <span>${Math.floor(data.main.temp)} °F</span></p><p>Wind Speed: <span>${(data.wind.speed)} MPH</span></p><p>Humidity: <span>${(data.main.humidity)}%</span></p></div>`)

        //going to call getUVIndex function
    });
    cityNameInput.val("");
    //create a functionCreateHTMLCards that will, when called, will display the 5day forcast and save city name to list
    function displayFiveDay () {
        $(containerForFiveDay).empty();
        //example of temperate literals
        var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`

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

                for (var i = 0; i < arrayOfForcastDay.length; i+=8) {
                    var currentForcastIndex = arrayOfForcastDay[i];
                    // console.log(currentForcastIndex);
                    
                    //append new container to'(container-for-five-day)
                    containerForFiveDay.append(`<div class = "col-2 border border-secondary m-1 bg-dark text-white"><h6>${(currentForcastIndex.dt_txt)}</h6><p>Temp: <span>${Math.floor(currentForcastIndex.main.temp)} °F</span></p><p>Wind Speed: <span>${(currentForcastIndex.wind.speed)} MPH</span></p><p>Humidity: <span>${(currentForcastIndex.main.humidity)}%</span></p></div>`)
                }
            })
    }
    displayFiveDay ();

    function saveCity () {
        var savedCityName = 
        listContainer.append(`<button></button>`)
        //local storage idea: key is the name inputted into the form and fair is data.main.name
    }
    saveCity ();
}

//creat a fucntion, when search button is clicked, the sarch item is saved in a list itemc reated and appended to UL


searchCities.on("submit", function searchCities(event) {
    event.preventDefault();
    var userSearchValue = cityNameInput.val();
    searchForCityAPI(userSearchValue);
    // console.log(userSearchValue);

    var savedCityNames =
    JSON.parse(localStorage.getItem("cityname"));

    if (savedCityNames === null) {
        savedCityNames = [];
    }
    savedCityNames.push(userSearchValue)
    // console.log(savedCityNames);
    localStorage.setItem("saved-location", JSON.stringify(savedCityNames))
});

//loop through 5day forcast
    //different fetch
//save to local storage
//retrieve from local storage