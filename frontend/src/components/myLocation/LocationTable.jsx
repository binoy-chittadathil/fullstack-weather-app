import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { WeatherContext } from '../context/WeatherContextProvider';

function LocationTable({ currentData, place, myLocationId, setSelectedLocation }) {
    const [select, setSelect] = useState(myLocationId[0])
    const { myLocationDataReady, setMyLocationDataReady, myLocationData } = useContext(WeatherContext);

    useEffect(() => {
        if (myLocationData.length > 0) {
            axios.get('/my-location').then(async ({ data }) => {
                await setSelectedLocation(data[0])
            })

        }
    }, [])

    // function for delete item in my location
    function handleDelete(locationId) {
        axios.delete(`/my-location/${locationId}`).then(() => {
            alert('data successfully deleted');
            setMyLocationDataReady(!myLocationDataReady);
            window.location.reload(true);
        }).catch(err => {
            alert('Some error occured, cart data not deleted');
            console.error(err);
        })
    };

    // function for handle selection
    function handleSelection(locationId) {
        setSelect(locationId);
        axios.get('/my-location').then(async ({ data }) => {
            const selectedLocation = await data.find((item) => item._id === locationId);
            setSelectedLocation(selectedLocation)
        }).catch(err => {
            console.error(err);
        })
    }

    return (
        <div className="overflow-x-auto bg-gray-200 p-3 rounded-xl">
            <table className="table">
                {/* head */}
                <thead className='bg-blue-950 text-white'>
                    <tr>
                        <th>#</th>
                        <th>Place</th>
                        <th>Temparature</th>
                        <th>Wind Speed</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row */}
                    {currentData.map((data, index) => (
                        <tr key={myLocationId[index]} onClick={() => handleSelection(myLocationId[index])} className={select === myLocationId[index] ? 'bg-gray-300' : 'cursor-pointer'}>
                            <th>{index + 1}</th>
                            <td>{place[index]}</td>
                            <td>{data.main.temp}</td>
                            <td>{data.wind.speed}</td>
                            <td>{data.weather[0].description}</td>
                            <th onClick={() => handleDelete(myLocationId[index])} className='text-lg hover:text-red-700 hover:cursor-pointer'><MdDelete /></th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LocationTable