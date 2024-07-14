const apiKey = "<your open weather api key>"; // WEATHER API
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // WEATHER API URL

const searchInput = document.querySelector(".search_input");    // CITY NAME INPUT
const searchIcon = document.querySelector(".search_icon");      // SEARCH ICON
const weatherIcon = document.querySelector(".weather_icon");    // WEATHER ICON

// FUNCTION TO GET WEATHER DATA
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`); // COMBINE URL + CITY NAME + API

    if(response.status === 404) {
        document.querySelector(".error_message").style.display = "block"; // DISPLAY ERROR MESSAGE
    } else {
        
        document.querySelector(".error_message").style.display = "none"; // HIDE ERROR MESSAGE IF VISIBLE

        let data = await response.json(); // WEATHER DATA FROM API
        
        // DECLARED VARIABLES FOR EACH DATA REQUIRED
        const cityName = data.name;                         // CITY NAME
        const cityTemperature = Math.round(data.main.temp); // TEMPERATURE
        const cityAirPressure = data.main.pressure;         // AIR PRESSURE
        const cityHumidity = data.main.humidity;            // HUMIDITY
        const cityWindSpeed = data.wind.speed;              // WIND SPEED
        const weatherCondition = data.weather[0].main;      // WEATHER CONDITION
        
        
        // PASSING VARIABLES FOR DISPLAY FUNCTION
        displayWeather(cityName, cityTemperature, cityAirPressure, cityHumidity, cityWindSpeed, weatherCondition);
        
    }
}

// FUNCTION TO DISPLAY THE WEATHER
const displayWeather = (cityName, cityTemperature, cityAirPressure, cityHumidity, cityWindSpeed, weatherCondition) => {

    document.querySelector("#details_card_view").style.display = "block";

    document.querySelector(".city_name").innerHTML = cityName;                      // DISPLAY CITY NAME
    document.querySelector(".temperature").innerHTML = cityTemperature;             // DISPLAY TEMPERATURE
    document.querySelector(".air_pressure").innerHTML = cityAirPressure + " Pa";    // DISPLAY AIR PRESSURE
    document.querySelector(".humidity").innerHTML = cityHumidity + " %";            // DISPLAY HUMIDITY
    document.querySelector(".wind_speed").innerHTML = cityWindSpeed + " km/hr";     // DISPLAY WIND SPEED

    // CHANGE WEATHER ICON BASED ON CLIMATE
    if (weatherCondition === "Clear") {          // CONDITION FOR CLEAR
        weatherIcon.src = "images/clear.png";
    } else if (weatherCondition === "Clouds") {  // CONDITION FOR CLOUD
        weatherIcon.src = "Images/clouds.png";
    } else if (weatherCondition === "Drizzle") { // CONDITION FOR DRIZZLE
        weatherIcon.src = "images/drizzle.png";
    } else if (weatherCondition === "Mist") {    // CONDITION FOR MIST
        weatherIcon.src = "images/mist.png";
    } else if (weatherCondition === "Rain") {    // CONDITION FOR RAIN
        weatherIcon.src = "images/rain.png";
    } else if (weatherCondition === "Snow") {    // CONDITION FOR RAIN
        weatherIcon.src = "images/snow.png";
    }
}

// CHECK IF THE CITY ENTERED IS CORRECT
checkInput = () => {

    if (searchInput.value != "") {
        document.querySelector(".error_message").style.display = "none";
        checkWeather(searchInput.value);
    }
}

// PASS THE CITY NAME WHEN SEARCH ICON IS CLICKED
searchIcon.addEventListener("click", checkInput);