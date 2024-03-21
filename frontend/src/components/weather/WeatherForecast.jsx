import React, { useContext, useState } from 'react'
import { WeatherContext } from '../context/WeatherContextProvider';
import checkWeatherLogo from '../controllers/weatherController';

function WeatherForecast() {
  const { WeatherForecastData } = useContext(WeatherContext);

  return (
    <div className='mt-5'>
      <div className='text-center py-1'><span className='bg-slate-950 rounded-full px-3 py-2 text-white shadow-md'>5 Day Forecast</span></div>
      <div className={WeatherForecastData?.length > 0 ? 'grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5' : 'flex justify-center items-center mt-5'}>
        {WeatherForecastData?.length > 0 ? (
          WeatherForecastData.map((data, index) => (
            <div key={index} className='flex flex-col items-center bg-slate-950 rounded-xl p-10 text-white w-full'>
              <h3 className='text-xl'>{data.dt_txt.split(' ')[0]}</h3>
              <div className='flex flex-col items-center'>
                <img src={checkWeatherLogo(data.weather[0].main)} className='w-24' />
                <p>{data.weather[0].description}</p>
              </div>
              <h4 className='mt-3 text-xl'>{data.main.temp}°C</h4>
            </div>
          ))
        ) : <p className=''>No forecast data available, search any city</p>}

      </div>
    </div>
  )
}

export default WeatherForecast