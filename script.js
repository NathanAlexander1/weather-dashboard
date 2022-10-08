var APIkey = "bbe39981906fc124cb49051c48a89934";
var todayNameDate = $("#today-name-date")
// var todayPlusOne = $("#todayPlusOne")
// var todayPlusTwo = $("#todayPlusTwo")
// var todayPlusThree = $("#todayPlusThree")
// var todayPlusFour = $("#todayPlusFour")
// var todayPlusFive = $("#todayPlusFive")
var todaysWeatherInfo = $("#todays-weather-info");
var containerForFiveDay = $("#container-for-five-day");
// todayNameDate.text(moment().format("dddd MMM Mo YYYY"));
// todayPlusOne.text(moment().add(1, "days").calendar())
// todayPlusTwo.text(moment().add(2, "days").calendar())
// todayPlusThree.text(moment().add(3, "days").calendar())
// todayPlusFour.text(moment().add(4, "days").calendar())
// todayPlusFive.text(moment().add(5, "days").calendar())

var cityNameInput = $('#cityNameInput');
var searchCities = $("#search-cities");


function searchForCityAPI(cityName) {
    $("#todays-weather-info").empty();
    var queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
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
        console.log(data);
        todaysWeatherInfo.append(`<h2>${data.name}</h2>`)
        todaysWeatherInfo.append(`<p>Temp: <span>${Math.floor(data.main.temp)} °F</span></p>`)
        todaysWeatherInfo.append(`<p>Wind Speed: <span>${(data.wind.speed)} MPH</span></p>`)
        todaysWeatherInfo.append(`<p>Humidity: <span>${(data.main.humidity)}%</span></p>`)

        //going to call getUVIndex function
    });
    cityNameInput.val("");
    //create a functionCreateHTMLCards that will, when called, will display the 5day forcast and save city name to list
    function displayFiveDay () {
        //example of temperate literals
        var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`

        fetch(fiveDayURL, {
            cache: "reload",
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var arrayOfForcastDay = data.list;
                console.log(arrayOfForcastDay);
                for (var i = 1; i < 6; i++) {
                    var currentForcastIndex = arrayOfForcastDay[i];
                    console.log(currentForcastIndex);
                    
                    //append new container to'(container-for-five-day)
                    containerForFiveDay.append(`<div border border-secondary p-2><h6>${(currentForcastIndex.dt_txt)}</h6><p>Temp: <span>${Math.floor(currentForcastIndex.main.temp)} °F</span></p><p>Wind Speed: <span>${(currentForcastIndex.wind.speed)} MPH</span></p><p>Humidity: <span>${(currentForcastIndex.main.humidity)}%</span></p></div>`)


                    // containerForFiveDay.append(`<p>Temp: <span>${Math.floor(currentForcastIndex.main.temp)} °F</span></p>`)
                    // containerForFiveDay.append(`<p>Wind Speed: <span>${(currentForcastIndex.wind.speed)} MPH</span></p>`)
                    // containerForFiveDay.append(`<p>Humidity: <span>${(currentForcastIndex.main.humidity)}%</span></p>`)
                        //within each container, creat weather info element and repeat steps from 36-39
                }
            })


    }
    displayFiveDay ();
}

//creat a fucntion, when search button is clicked, the sarch item is saved in a list itemc reated and appended to UL
function saveCity () {


    //call functionCreateHTMLCards
}



searchCities.on("submit", function searchCities(event) {
    event.preventDefault();
    var userSearchValue = cityNameInput.val();
    searchForCityAPI(userSearchValue);
    // console.log(userSearchValue);
});

//clear input
//loop through 5day forcast
    //different fetch
//save to local storage
//retrieve from local storage