import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import foreCastData from '../controllers/foreCastData';

function LocationChart({selectedLocation}) {
    const {latti,longi}=selectedLocation;
    const [oneDayThreeHourForecastData, setOneDayThreeHourForecastData] = useState([]);
    const [cityName,setCityName]=useState('')
    const [lineData, setLineData] = useState({
        labels: [] , 
    datasets: [
        {
            label: 'Temparature',
            data: [],
        }
    ]
    });

    useEffect(()=>{
        getData()
    },[latti,longi]);

    // for getting threehour and day forecast data
    async function getData(){
    if(latti){
        const {threeHourForecast,dayForecast}=await foreCastData(latti,longi);
        setCityName(threeHourForecast.city.name)
        console.log(threeHourForecast);
       const filtered=threeHourForecast.list.filter(data=>data.dt_txt.split(' ')[0]===new Date().toISOString().split('T')[0]);
       console.log(filtered);
       setOneDayThreeHourForecastData(filtered);
    }
    }
    
    useEffect(()=>{
        if (oneDayThreeHourForecastData.length > 0) {
            // Extracting labels (hours) and temperatures
            const labels = oneDayThreeHourForecastData.map(data => data.dt_txt.split(' ')[1].slice(0, -3)); // Extracting hours from dt_txt
            const temperatures = oneDayThreeHourForecastData.map(data => data.main.temp);

            setLineData({
                labels: labels,
                datasets: [
                    {
                        label: 'Temperature',
                        data: temperatures,
                    }
                ]
            });
        }
    },[oneDayThreeHourForecastData])
    
  return (
    <div className='w-full lg:w-96 bg-gray-200 p-3 rounded-xl'>
        <div className='flex justify-center mb-5'>
            <h3>{cityName}</h3>
        </div>
        <Line data={lineData} />
    </div>
  )
}

export default LocationChart