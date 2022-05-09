// API KEY
var key = 'f02276f19053510918c150f902c2d4b6'

// DOM ELEMENTS
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city-input');
var cityContainerEl = document.querySelector('#city-container');
var citySearchTerm = document.querySelector('#city-search-term');
var currentWeather = document.querySelector('#current-weather') 
var previousCityEl = document.getElementById('search-container');
var fiveDayEl = document.querySelector('#forecast-cards');
var currentUvEl = document.querySelector("#uv-input")

var cityArray = [];

var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCityWeather(city);
        getForecast(city);

        cityArray.push(city);
        localStorage.setItem('city', JSON.stringify(cityArray));

        cityInputEl.value = '';
    } else {
        alert('Enter City Here');
    }
};

var clickHandler = function (event) {
    var clickCity = event.currentTarget.textContent;

    getCityWeather(clickCity);
    getForecast(clickCity);
};

var getCityWeather = function(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;

    fetch(apiURL).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayCityWeather(data, city);
            });

        } else {
            alert("Error:" + response.statusText);
        }
    })

    // .catch(function(error) {
    //     alert('Unable to connect');
    // })
};

var searchCityUV = function(lon, lat, city) {
    var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?q=" + city + "&appid=" + key + "&lat=" + lat + "&lon=" + lon; 

    fetch(uvUrl).then(function(response) {
        if (response.ok) {
            reponse.json().then(function(lon, lat, city) {
                displayCurrentUV(lon, lat, city);
            });
        } else {
            alert('Error:' + response.statusText);
        }
    })

    // .catch(function(error) {
    //     alert('Unable to connect');
    // })
};

var displayCityWeather = function(city, searchTerm) {
    cityContainerEl.textContent = '';
    citySearchTerm.textContent = searchTerm;

    var displayCurrentDate = document.querySelector('#city-current-date');
    var currentDate = moment();
    displayCurrentDate.textContent = currentDate.format('(L)');

    var displayIcon = document.querySelector("#city-current-icon");
    var currentIcon = "https://openweathermap.org/img/wn/" + city.weather[0].icon + "@2x.png"
    displayIcon.setAttribute ("src", currentIcon);

    var displayTemp = document.querySelector('#temp-input');
    var currentTemp = Math.round(city.main.temp) + '°F';
    displayTemp.textContent = currentTemp;

    var displayHumidity = document.querySelector('#humidity-input');
    var currentHumidity = city.main.humidity + '%';
    displayHumidity.textContent = currentHumidity;

    var displayWind = document.querySelector('#wind-input');
    var currentWind = city.wind.speed + ' mph';
    displayWind.textContent = currentWind;

    var newCityEl = document.createElement('li');
    newCityEl.className = 'list-group-item';
    newCityEl.textContent = searchTerm;
    newCityEl.addEventListener('click', clickHandler);
    previousCityEl.appendChild(newCityEl);

    var lon = city.coord.lon;
    var lat = city.coord.lat;

    searchCityUV(lon, lat, city);
};

var displayCurrentUV = function(data) {
    var uv = data.value;
    if (uv >= 6) {
        currentUvEl.classList = 'badge badge-danger'
        currentUvEl.innerHTML = '' + uv + '';

    } else if (uv > 3) {
        currentUvEl.classList = 'badge badge-warning'
        currentUvEl.innerHTML = '' + uv + '';
    } else {
        currentUvEl.classList = 'badge badge-success'
        currentUvEl.innerHTML = '' + uv + '';
    }
};

var getForecast = function(city) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=6&appid=" + key;
    
    fetch(forecastUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayForecast(data.list);

            });
        } else {
            alert('Error:' + response.statusText);
        }
    })

    // .catch(function(error) {
    //     alert('Unable to connect');
    // })
    
};

var displayForecast = function(list) {
    console.log(list);

    for (var i = 0; i <= 4; i++) {

        var displayDate1 = document.querySelector('#date-0');
        var forecastDate1 = moment().add(1, 'days').format('L');
        displayDate1.textContent = forecastDate1;

        var displayDate2 = document.querySelector('#date-1');
        var forecastDate2 = moment().add(2, 'days').format('L');
        displayDate2.textContent = forecastDate2;

        var displayDate3 = document.querySelector('#date-2');
        var forecastDate3 = moment().add(3, 'days').format('L');
        displayDate3.textContent = forecastDate3;

        var displayDate4 = document.querySelector('#date-3');
        var forecastDate4 = moment().add(4, 'days').format('L');
        displayDate4.textContent = forecastDate4;

        var displayDate5 = document.querySelector('#date-4');
        var forecastDate5 = moment().add(5, 'days').format('L');
        displayDate5.textContent = forecastDate5;

        var displayTemp = document.querySelector(`#temp-${i}`);
        var forecastTemp = list[i].main.temp + '°F';
        displayTemp.textContent = forecastTemp;

        var displayHumidity = document.querySelector(`#humidity-${i}`);
        var forecastHumidity = list[i].main.humidity + '%';
        displayHumidity.textContent = forecastHumidity;

        // weather images

        var displayIcon1 = document.querySelector("#city-icon-1");
        var currentIcon1 = "https://openweathermap.org/img/wn/" + list[1].weather[0].icon + "@2x.png"
        displayIcon1.setAttribute ("src", currentIcon1);

        var displayIcon2 = document.querySelector("#city-icon-2");
        var currentIcon2 = "https://openweathermap.org/img/wn/" + list[2].weather[0].icon  + "@2x.png"
        displayIcon2.setAttribute ("src", currentIcon2);

        var displayIcon3 = document.querySelector("#city-icon-3");
        var currentIcon3 = "https://openweathermap.org/img/wn/" + list[3].weather[0].icon  + "@2x.png"
        displayIcon3.setAttribute ("src", currentIcon3);

        var displayIcon4 = document.querySelector("#city-icon-4");
        var currentIcon4 = "https://openweathermap.org/img/wn/" + list[4].weather[0].icon  + "@2x.png"
        displayIcon4.setAttribute ("src", currentIcon4);

        var displayIcon5 = document.querySelector("#city-icon-5");
        var currentIcon5 = "https://openweathermap.org/img/wn/" + list[5].weather[0].icon  + "@2x.png"
        displayIcon5.setAttribute ("src", currentIcon5);
    }
};

userFormEl.addEventListener('submit', formSubmitHandler);