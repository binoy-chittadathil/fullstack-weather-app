
//checking logo for suitable weather
function checkWeatherLogo(weather) {
    switch (weather) {
        case 'Clear':
            return 'images/weather icons/clear.png';
        case 'Clouds':
            return 'images/weather icons/clouds.png';
        case 'Drizzle':
            return 'images/weather icons/drizzle.png';
        case 'Mist':
            return 'images/weather icons/mist.png';
        case 'Rain':
            return 'images/weather icons/rain.png';
        default:
            return 'images/weather icons/snow.png';
    }
}

export default checkWeatherLogo