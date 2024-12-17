const Api_key = `7f773afba14714da30d2cfc9080cec67`;
const cityDropdown = document.querySelector("#cityDropdown");
const weather = document.querySelector("#weather");

cityDropdown.addEventListener('change', function() {
    const selectedCity = cityDropdown.value;
    if (selectedCity) {
        getWeather(selectedCity);
    }
});

const getWeather = async (city) => {
    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=metric`;
    const response = await fetch(Url);
    const data = await response.json();
    showWeather(data);
}

const showWeather = (data) => {
    if (data.cod == '404') {
        weather.innerHTML = `City not found. Please select a valid city.`;
    } else {
        weather.innerHTML = `<div>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
            </div>
            <div>
                <h2>${data.main.temp} °C</h2>
                <h4>${data.weather[0].main}</h4>
            </div>`;
    }
}

// Automatically show weather for a default city (like Lahore)
(function () {

    getWeather('Haveli Lakha');
    cityDropdown.value='Haveli Lakha'
})();
