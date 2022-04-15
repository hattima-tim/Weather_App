const getWeatherData= async function (location) {
    try {
        const url=`http://api.openweathermap.org/data/2.5/weather?q=${ location }&APPID=6a45a6a1f9ac0dde88276011ee3a19fe`;
        const response=await fetch(url, { mode: "cors" });
        const weatherData=await response.json();
        return weatherData;
    }catch(err) {
        alert(err);
    }

};
getWeatherData('dhaka');
