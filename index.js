const sendReqForWeatherData= async function (location) {
    try {
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${ location }&APPID=6a45a6a1f9ac0dde88276011ee3a19fe&units=metric`;
        const response=await fetch(url, { mode: "cors" });
        const weatherData=await response.json();
        if (weatherData.cod==='404') {
            throw new Error(weatherData.message);
        }
        return weatherData;
    }catch(err) {
        alert(err);
    }

};
const getWeatherData =async function (location) {
    try {
        const weatherData= await sendReqForWeatherData(location);
        const locationName=weatherData.name;
        const { temp } = weatherData.main;
        const { feels_like } = weatherData.main;
        const { humidity } = weatherData.main;
        const windSpeed=weatherData.wind.speed;
        return { locationName, temp, feels_like, humidity, windSpeed };
    }catch(err) {
        console.log(err);
    }

};

const showWeatherData = function (data) {
    const weatherDataModal = document.querySelector('#modal');
    const locationName = document.createElement('h3');
    locationName.textContent = data.locationName;
    const temp = document.createElement('p');
    temp.textContent = `Temp: ${ data.temp } °C`;
    const feels_like = document.createElement('p');
    feels_like.textContent = `Feels like: ${ data.feels_like } °C`;
    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${ data.humidity } %`;
    const windSpeed = document.createElement('p');
    windSpeed.textContent = `Windspeed: ${ data.windSpeed } km/h`;
    weatherDataModal.replaceChildren( locationName, temp, feels_like, humidity, windSpeed );
    weatherDataModal.style.display="block";
};

const searchButton=document.querySelector('#searchButton');
searchButton.addEventListener('click', async (e) => {
    const searchQuery=e.target.previousElementSibling.value;
    if (searchQuery==='') {
        alert('Please search for a valid location.');
    } else {
        const data = await getWeatherData(searchQuery);
        showWeatherData(data);
    }
});