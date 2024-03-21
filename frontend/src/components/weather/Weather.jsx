import React from 'react';
import WeatherBanner from './WeatherBanner';
import CurrentWeatherDescrtiption from './CurrentWeatherDescrtiption';
import WeatherForecast from './WeatherForecast';

function Weather() {
    return (
        <div className='p-5 bg-orange-50'>
            <WeatherBanner />
            <CurrentWeatherDescrtiption />
            <WeatherForecast />
        </div>
    )
}

export default Weather