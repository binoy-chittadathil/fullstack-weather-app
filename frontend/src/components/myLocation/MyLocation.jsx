import React, { useContext, useEffect, useState } from 'react'
import LocationTable from './LocationTable'
import { WeatherContext } from '../context/WeatherContextProvider';
import foreCastData from '../controllers/foreCastData';
import Loading from '../loading/Loading'
import LocationChart from './LocationChart';

function MyLocation() {
    const [currentData, setCurrentData] = useState([])
    const [ok, setOk] = useState(false);
    const [place, SetPlace] = useState([]);
    const [myLocationId, setMyLocationId] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState({})
    const { myLocationData, latti, longi, myLocationDataReady } = useContext(WeatherContext);

    useEffect(() => {
        getData()
    }, [latti, longi, myLocationDataReady]);

    async function getData() {
        let allDayForecastData = [];
        let allPlace = [];
        let allMyLocationId = [];

        for (const data of myLocationData) {
            const { latti, longi, place, _id } = data;
            allPlace = [...allPlace, place];
            allMyLocationId = [...allMyLocationId, _id]
            SetPlace(allPlace);
            setMyLocationId(allMyLocationId);

            const { dayForecast } = await foreCastData(latti, longi);
            allDayForecastData = [...allDayForecastData, ...dayForecast];
            const currentData = await allDayForecastData.filter((data) => data.dt_txt.split(' ')[0] === new Date().toISOString().split('T')[0]);
            setCurrentData(currentData);
            setOk(true)
        }
    }

    if (!ok && myLocationData.length > 0) {
        return (
            <Loading />
        )
    }
    return (
        <div className='bg-gray-50 h-screen px-1'>
            <div className='flex items-center justify-center py-10'>
                <h1 className='text-3xl font-semibold text-blue-950'>My Locations</h1>
            </div>
            <div className='flex flex-col lg:flex-row justify-around gap-10'>
                <LocationTable currentData={currentData} place={place} myLocationId={myLocationId} setSelectedLocation={setSelectedLocation} />
                <LocationChart selectedLocation={selectedLocation} />
            </div>
        </div>
    )
}

export default MyLocation