import React from 'react'

function Loading() {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <span className="loading loading-bars loading-xs text-orange-200"></span>
            <span className="loading loading-bars loading-sm text-orange-200"></span>
            <span className="loading loading-bars loading-md text-orange-200"></span>
            <span className="loading loading-bars loading-lg text-orange-200"></span>
        </div>
    )
}

export default Loading