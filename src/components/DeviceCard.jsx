import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function DeviceCard() {
    const navigate = useNavigate()

    return (
        <button className='text-left' onClick={()=>navigate("/device")}>
            <div className="flex m-4 overflow-hidden bg-gray-50 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition ease-in-out duration-650 dark:bg-gray-800">
                {/* <div className="w-1/3 bg-cover" style={{ backgroundImage: `url(${"https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"})`}}></div> */}
                {/* <div className="w-1/3 bg-cover"></div> */}

                {/* <div className="w-2/3 p-4 md:p-4"> */}
                <div className="w-full p-4 md:p-4">
                    <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                        Lampu Kerja <span className='text-xs px-2 py-0.5 bg-gray-800 text-gray-100 font-semibold rounded-lg'>lamp</span>
                    </h1>
                    <span className='text-sm text-gray-800 font-semibold'>ID: 8272jhdsdjsd3</span>
                </div>
            </div>
        </button>
    )
}

export default DeviceCard