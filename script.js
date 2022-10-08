var APIkey = "bbe39981906fc124cb49051c48a89934";
var todayNameDate = $("#today-name-date")
var todayPlusOne = $("#todayPlusOne")
var todayPlusTwo = $("#todayPlusTwo")
var todayPlusThree = $("#todayPlusThree")
var todayPlusFour = $("#todayPlusFour")
var todayPlusFive = $("#todayPlusFive")

todayNameDate.text(moment().format("dddd MMM Mo YYYY"));
todayPlusOne.text(moment().add(1, "days").calendar())
todayPlusTwo.text(moment().add(2, "days").calendar())
todayPlusThree.text(moment().add(3, "days").calendar())
todayPlusFour.text(moment().add(4, "days").calendar())
todayPlusFive.text(moment().add(5, "days").calendar())



var searchCities = $("#search-cities");

function searchForCityAPI(cityName) {
    var queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "&appid=" +
  APIkey;
    fetch(queryURL, {
    cache: "reload",
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });

    //saveCity
}
//creat a fucntion, when search button is clicked, the sarch item is saved in a list itemc reated and appended to UL
function saveCity () {
    

    //call functionCreateHTMLCards
}

//create a functionCreateHTMLCards that will, when called, will display the 5day forcast and save city name to list

searchCities.on("submit", function searchCities(event) {
    event.preventDefault();
    var cityNameInput = $('#cityNameInput');
    cityNameInput.val();
    searchForCityAPI(cityNameInput.val());
    console.log(cityNameInput.val());

});
