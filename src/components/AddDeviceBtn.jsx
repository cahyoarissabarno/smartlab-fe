import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";

function AddDeviceBtn() {
    const [count, setCount] = useState(0)
    const [show, setShow] = useState(false)

    return (
        <button className='text-left'>
            <div className="flex m-4 overflow-hidden bg-gray-50 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition ease-in-out duration-650 dark:bg-gray-800 border-dashed border-2 border-blue-900">
                <div className="w-1/3">
                    <FaPlus className='w-full h-20 p-5 text-gray-800'/>
                </div>
                <div className="w-2/3 p-4 md:p-4 my-auto">
                    <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                        Add New Device
                    </h1>
                </div>
            </div>
        </button>
    )
}

export default AddDeviceBtn