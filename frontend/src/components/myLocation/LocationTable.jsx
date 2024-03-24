import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { WeatherContext } from '../context/WeatherContextProvider';

function LocationTable({ currentData, place }) {
    const { myLocationDataReady, setMyLocationDataReady } = useContext(WeatherContext);

    // function for delete item in my location
    function handleDelete(place) {
        axios.delete(`/my-location/${place}`).then(() => {
            alert('data successfully deleted');
            setMyLocationDataReady(!myLocationDataReady);
            window.location.reload(true);
        }).catch(err => {
            alert('Some error occured, cart data not deleted');
            console.error(err);
        })
    }

    return (
        <div className="overflow-x-auto">
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
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{place[index]}</td>
                            <td>{data.main.temp}</td>
                            <td>{data.wind.speed}</td>
                            <td>{data.weather[0].description}</td>
                            <th onClick={() => handleDelete(place[index])} className='text-lg hover:text-red-700 hover:cursor-pointer'><MdDelete /></th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LocationTable