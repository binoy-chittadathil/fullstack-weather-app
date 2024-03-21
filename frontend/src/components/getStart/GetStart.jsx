import React from 'react'
import LoginPopupWindow from '../login/LoginPopupWindow'

function GetStart() {
    return (
        <div className='flex flex-col items-center justify-center gap-10 h-screen px-3 bg-[url("/weatherBanner.jpg")]'>
            <div className='text-center text-5xl font-bold'>
                <h1 className='text-white'>Weather</h1>
                <h1 className='text-white'>App</h1>
            </div>
            <button onClick={() => document.getElementById('my_modal_5').showModal()}
                className='btn px-10 rounded-full bg-orange-500 text-blue-800 text-lg'>
                Get Start
            </button>
            <LoginPopupWindow />
        </div>
    )
}

export default GetStart