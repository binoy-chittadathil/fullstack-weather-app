import React, { useContext, useEffect } from 'react';
import { MdEditLocationAlt } from "react-icons/md";
import { UserContext } from '../context/UserContexProvider';
import { FaRegUser } from "react-icons/fa";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { WeatherContext } from '../context/WeatherContextProvider';

function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const { myLocationData, setMyLocationData } = useContext(WeatherContext);
    const navigate = useNavigate();

    // get my location data
    useEffect(() => {
        axios.get('/my-location').then(({ data }) => {
            setMyLocationData(data);
            console.log(data);
        }).catch(err => {
            console.error(err);
        })
    }, [user])

    //handle logout
    async function handleLogout() {
        try {
            await axios.post('/user/logout');
            setUser('');
            setMyLocationData([])
            // Redirect to signup page after successful logout
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }


    return (
        <div className="navbar sm:px-3 shadow-sm fixed bg-gray-100">
            <div className="flex-1">
                <Link to={user ? '/weather' : '/'} className="btn btn-ghost text-xl">Weather App</Link>
            </div>
            <div className="flex-none space-x-1">
                {/* my location button */}
                <Link to={'/weather/my-location'} className="dropdown dropdown-end hidden sm:block">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <MdEditLocationAlt className='h-6 w-6' />
                            <span className="badge badge-sm indicator-item">{myLocationData.length}</span>
                        </div>
                    </div>
                </Link>

                {/* login or user button */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="/images/user_logo.webp" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">{user.name}</span>
                                </a>
                            </li>
                            <Link to={'/weather/my-location'} className='mx-3 flex justify-between'>
                                My Location
                                <span className="badge badge-sm indicator-item">{myLocationData.length}</span>

                            </Link>
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>
                ) : (
                    <button onClick={() => document.getElementById('my_modal_5').showModal()}
                        className='btn rounded-full px-5 text-white bg-blue-600'><FaRegUser />
                        Login
                    </button>
                )}
            </div>
        </div>
    )
}

export default Navbar