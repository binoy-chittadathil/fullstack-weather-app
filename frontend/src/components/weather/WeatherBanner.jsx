import React, { useContext, useEffect, useState } from 'react';
import { FaLocationCrosshairs } from "react-icons/fa6";
import { WeatherContext } from '../context/WeatherContextProvider';
import checkWeatherLogo from '../controllers/weatherController'
import axios from 'axios';

function WeatherBanner() {
    const [cityName, setCityName] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Initialize with current date
    const [newDate, setNewDate] = useState(date);
    const [weatherImageUrl, setWeatherImageUrl] = useState('');
    const [ok, setOk] = useState(false)
    const { temparature, setTemparature, setWeatherForeCastData,
        setHumidity, setWeatherDes, setWindSpeed, currentWeatherData,
        setCurrentWeatherData, latti, setLatti, longi,
        setMyLocationDataReady, myLocationDataReady, setLongi } = useContext(WeatherContext)

    const apiKey = 'fb897f8961c15daa0c50812a6ce4180c';
    const units = 'metric';
    const GeoApiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    useEffect(() => {
        getForeCastData();
        getcurrentweather();
    }, [latti, longi, ok]);


    // function for getting longitude and lattitude
    async function getLongAndLatti() {
        try {
            const response = await fetch(GeoApiURL);
            const data = await response.json();
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            setLatti(latitude);
            setLongi(longitude);
            setOk(!ok)
        } catch {
            alert('no data found')
        }
    }

    // for finding weather data by using input data
    async function findWeatherData(ev) {
        ev.preventDefault();
        await getLongAndLatti();
    }


    // get weather data
    async function getForeCastData() {
        const searchApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latti}&lon=${longi}&units=${units}&appid=${apiKey}`;
        const response = await fetch(searchApiURL);
        const data = await response.json();

        const filteredData = data.list.filter((item, index) => index % 8 === 0);  // Filter data to include only one data point per day
        setWeatherForeCastData(filteredData);
        // output data using date searching
        try {
            const searchedData = await filteredData.find((data) => data.dt_txt.split(' ')[0] === date)
            setTemparature(searchedData.main.temp);
            setNewDate(searchedData.dt_txt.split(' ')[0]);
            setHumidity(searchedData.main.humidity);
            setWeatherDes(searchedData.weather[0].description);
            setWindSpeed(searchedData.wind.speed);
            setWeatherImageUrl(searchedData.weather[0].main);
        } catch {
            alert(`Type only the date up to five days from the current date(${new Date().toISOString().split('T')[0]})`);
            setDate(new Date().toISOString().split('T')[0]);
        }

    };

    // forecast api not include the city name in data. so call another api for getting this details
    async function getcurrentweather() {
        const currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latti}&lon=${longi}&appid=${apiKey}`;
        const response = await fetch(currentWeatherApi);
        const data = await response.json();
        await setCurrentWeatherData(data)

    };

    // function for getting current location
    function currentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert('Geolocation not supported')
        }

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLatti(latitude);
            setLongi(longitude);
        }

        function error() {
            alert('Unable to retrieve your location')
        }
    };

    // function for handle add to my location
    function handleAddToMyLocation() {
        const place = currentWeatherData.name;
        axios.post('/my-location', { place, longi, latti }).then(() => {
            alert("data saving successful");
            setMyLocationDataReady(!myLocationDataReady)
        }).catch(err => {
            alert('data alredy exist')
            console.error(err);
        })
    }

    return (
        <div className='px-8 py-5 bg-[url("/weatherBanner.jpg")] rounded-xl'>
            <form onSubmit={findWeatherData} className='flex flex-col sm:flex-row gap-5 items-center justify-center '>
                {/* search bar */}
                <input className='border rounded-full w-full sm:w-1/2 py-2 px-4 outline-none' type="search" required value={cityName} onChange={(ev) => setCityName(ev.target.value)} />
                <div className='flex gap-5'>
                    {/* date input field */}
                    <div className="btn btn-ghost btn-circle border border-gray-200 sm:border-none text-white">
                        <input type="date" value={date} onChange={(ev) => setDate(ev.target.value)} className='rounded-full w-5 h-5 outline-none' />
                    </div>
                    {/* search button */}
                    <button className="btn btn-ghost btn-circle border border-gray-200 sm:border-none text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </form>
            {/* current location button */}
            <p onClick={currentLocation} className='flex items-center justify-center gap-2 mt-3 cursor-pointer text-gray-300 italic'>
                <FaLocationCrosshairs className='text-black' />
                access current location
            </p>
            {/* searched location basic details */}
            <div className='flex flex-col sm:flex-row gap-4 justify-around items-center'>
                <div className='flex flex-col items-center'>
                    <img src={checkWeatherLogo(weatherImageUrl)} className='w-40' />
                    <div className='text-center space-y-3 text-white font-bold relative'>
                        <h1 className='text-6xl'>{temparature}°C</h1>
                        <h3 className='text-4xl'>{currentWeatherData.name}</h3>
                        <p>{newDate}</p>
                    </div>
                </div>
                <button onClick={handleAddToMyLocation} className='btn rounded-full'>Add to My Location</button>
            </div>
        </div>
    )
}

export default WeatherBanner