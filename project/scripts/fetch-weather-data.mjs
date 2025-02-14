const fetchWeatherData = {
    latitude: "",
    longitude: "",

    setCoordinates: function(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    },

    getData: async function() {
        const currentWeather = await getCurrentWeather(this.latitude, this.longitude);
        const weatherForecast = await getWeatherForecast(this.latitude, this.longitude);
        return [currentWeather, weatherForecast];
    },

    init: function() {
        const randomLatitude = getRandomNumber(-90, 90);
        const randomLongitude = getRandomNumber (-180, 180);
        this.setCoordinates(randomLatitude, randomLongitude);
    }
}

function getRandomNumber(min, max) {
    let randomNum = Math.random() * (max - min) + min;
    return parseFloat(randomNum.toFixed(4));
}

async function getCurrentWeather(latitude, longitude) {
    const url = `//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=d058bca00aab868d78e766a79f4ed821`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
        } catch (error) {
            console.log(error);
    }
}

async function getWeatherForecast(latitude, longitude) {
    const url = `//api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=d058bca00aab868d78e766a79f4ed821`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
        } catch (error) {
            console.log(error);
    }
}

export default fetchWeatherData;