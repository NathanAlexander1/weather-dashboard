var APIkey = "bbe39981906fc124cb49051c48a89934";
var todayNameDate = $("#today-name-date")
var todaysWeatherInfo = $("#todays-weather-info");
var containerForFiveDay = $("#container-for-five-day");
var cityNameInput = $('#cityNameInput');
var searchCities = $("#search-cities");
var listContainer = $("#searchList");

var savedCityNames = [];

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
        todaysWeatherInfo.append(`<div class = "border p-2"><h2>${data.name}, ${(moment().format("ddd MMM DD, YYYY"))}<img src = "https://openweathermap.org/img/wn/${(data.weather[0].icon)}.png"></img></h2><p>Temp: <span>${Math.floor(data.main.temp)} °F</span></p><p>Wind Speed: <span>${(data.wind.speed)} MPH</span></p><p>Humidity: <span>${(data.main.humidity)}%</span></p></div>`)

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

                for (var i = 1; i < arrayOfForcastDay.length; i+=8) {
                    var currentForcastIndex = arrayOfForcastDay[i];
                    // console.log(currentForcastIndex)
                    var currentIcon = currentForcastIndex.weather[0].icon;
                    // console.log(currentIcon);
                    
                    //append new container to'(container-for-five-day)
                    containerForFiveDay.append(`<div class = "col-2 border border-secondary m-1 bg-dark text-white"><h6>${moment(currentForcastIndex.dt_txt).format('ddd MMM DD, YYYY')}<img src = "https://openweathermap.org/img/wn/${(currentIcon)}.png"></img></h6><p>Temp: <span>${Math.floor(currentForcastIndex.main.temp)} °F</span></p><p>Wind Speed: <span>${(currentForcastIndex.wind.speed)} MPH</span></p><p>Humidity: <span>${(currentForcastIndex.main.humidity)}%</span></p></div>`)
                }
            })
    }
    displayFiveDay ();

    function saveCity (inputValue) {
        // var savedCityName = 
        // listContainer.innerHTML = '';
        //local storage idea: key is the name inputted into the form and fair is data.main.name
        var savedCityNames = JSON.parse(localStorage.getItem("cityname")) || [];

        console.log(savedCityNames);
    

        savedCityNames.push(inputValue)
        // // console.log(savedCityNames);
        localStorage.setItem("cityname", JSON.stringify(savedCityNames));

        for (var j = 0; j <savedCityNames.length; j++) {
            // listContainer.innerHTML = "";
            var currentCityName = savedCityNames[j];
            listContainer.append(`<button class = 'col' id = 'currentCityName'>${(currentCityName)}</button>`)
        }
        // listContainer.append(`<button class = 'col' id = 'currentCityName'>${(savedCityNames[0])}</button>`)

    }
    saveCity(cityName);
}

//creat a fucntion, when search button is clicked, the sarch item is saved in a list itemc reated and appended to UL


searchCities.on("submit", function searchCities(event) {
    event.preventDefault();
    var userSearchValue = cityNameInput.val();
    searchForCityAPI(userSearchValue);
    // console.log(userSearchValue);
    
});

// currentCityName.on("click", searchForCityAPI(currentCityName.val()));
//loop through 5day forcast
    //different fetch
//save to local storage
//retrieve from local storage