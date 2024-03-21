import React from 'react'
import LocationTable from './LocationTable'

function MyLocation() {
    return (
        <div className='bg-gray-50 h-screen'>
            <div className='flex items-center justify-center py-10'>
                <h1 className='text-3xl font-semibold text-blue-950'>My Locations</h1>
            </div>
            <LocationTable />
        </div>
    )
}

export default MyLocation