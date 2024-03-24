import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios'

export const WeatherContext = createContext();

function WeatherContextProvider({ children }) {
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const [temparature, setTemparature] = useState(17);
  const [WeatherForecastData, setWeatherForeCastData] = useState([]);
  const [humidity, setHumidity] = useState(60);
  const [weatherDes, setWeatherDes] = useState('brocken clouds');
  const [windSpeed, setWindSpeed] = useState(100);
  const [latti, setLatti] = useState(51.5073);
  const [longi, setLongi] = useState(-0.1276);
  const [myLocationData, setMyLocationData] = useState([]);
  const [myLocationDataReady, setMyLocationDataReady] = useState(false);

  const contextValue = {
    currentWeatherData, setCurrentWeatherData, temparature, setTemparature,
    WeatherForecastData, setWeatherForeCastData, humidity,
    setHumidity, weatherDes, setWeatherDes, windSpeed, setWindSpeed, latti,
    setLatti, longi, setLongi, myLocationData, setMyLocationData, myLocationDataReady,
    setMyLocationDataReady
  };

  // get my location data
  useEffect(() => {
    axios.get('/my-location').then(({ data }) => {
      setMyLocationData(data);
    }).catch(err => {
      console.error(err);
    })
  }, [longi, latti, myLocationDataReady])

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherContextProvider