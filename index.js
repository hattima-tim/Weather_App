const sendReqForWeatherData= async function (location) {
    try {
        const url=`http://api.openweathermap.org/data/2.5/weather?q=${ location }&APPID=6a45a6a1f9ac0dde88276011ee3a19fe&units=metric`;
        const response=await fetch(url, { mode: "cors" });
        const weatherData=await response.json();
        return weatherData;
    }catch(err) {
        console.logy(err);
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
    const locationName = document.createElement('p');
    locationName.textContent = data.locationName;
    const temp = document.createElement('p');
    temp.textContent = `Temp: ${ data.temp } °C`;
    const feels_like = document.createElement('p');
    feels_like.textContent = `Feels like: ${ data.feels_like } °C`;
    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${ data.humidity } %`;
    const windSpeed = document.createElement('p');
    windSpeed.textContent = `Windspeed: ${ data.windSpeed } km/h`;
    weatherDataModal.appendChild(locationName);
    weatherDataModal.appendChild (temp);
    weatherDataModal.appendChild (feels_like);
    weatherDataModal.appendChild (humidity);
    weatherDataModal.appendChild (windSpeed);
    weatherDataModal.style.display="flex";
    weatherDataModal.style.flexWrap='wrap';
    weatherDataModal.style.justifyContent="center";
    weatherDataModal.style.alignItems="center";
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