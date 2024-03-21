import React, { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContextProvider'

function CurrentWeatherDescrtiption() {
    const { temparature, humidity, weatherDes, windSpeed } = useContext(WeatherContext)

    return (
        <div className='flex flex-col md:flex-row justify-between items-center mt-5 gap-5'>
            <div className='bg-gray-100 p-5 rounded-xl border shadow space-y-2 w-full'>
                <p className='font-semibold'>Current Temparature</p>
                <h4 className='text-2xl bg-white py-1 px-3 rounded-full'>{temparature}°C</h4>
            </div>
            <div className='bg-gray-100 p-5 rounded-xl border shadow space-y-2 w-full'>
                <p className='font-semibold'>Wind Speed</p>
                <h4 className='text-2xl bg-white py-1 px-3 rounded-full'>{windSpeed}km/h</h4>
            </div>
            <div className='bg-gray-100 p-5 rounded-xl border shadow space-y-2 w-full'>
                <p className='font-semibold'>Humidity</p>
                <h4 className='text-2xl bg-white py-1 px-3 rounded-full'>{humidity}%</h4>
            </div>
            <div className='bg-gray-100 p-5 rounded-xl border shadow space-y-2 w-full'>
                <p className='font-semibold'>Weather Type</p>
                <h4 className='text-2xl bg-white py-1 px-3 rounded-full'>{weatherDes}</h4>
            </div>
        </div>
    )
}

export default CurrentWeatherDescrtiption