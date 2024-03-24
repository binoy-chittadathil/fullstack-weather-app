
async function foreCastData(latti, longi) {
    const apiKey = 'fb897f8961c15daa0c50812a6ce4180c';
    const units = 'metric';
    const searchApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latti}&lon=${longi}&units=${units}&appid=${apiKey}`;
    const response = await fetch(searchApiURL);
    const threeHourForecast = await response.json();

    const dayForecast = threeHourForecast.list.filter((item, index) => index % 8 === 0);
    return { threeHourForecast, dayForecast }
}

export default foreCastData