import React from 'react'

function LocationTable() {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead className='bg-blue-950 text-white'>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Temparature</th>
                        <th>Wind Speed</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row */}
                    <tr>
                        <th>1</th>
                        <td>kozhikode</td>
                        <td>32</td>
                        <td>10km/h</td>
                        <td>rain</td>
                        <th>delete</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LocationTable