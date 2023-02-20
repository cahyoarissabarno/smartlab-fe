import React, { useState } from 'react'
import DeviceDetail from '../components/DeviceDetail';
import RoomNavbar from '../components/RoomNavbar';

function DeviceDetails() {
  return (
    <div className='bg-gradient-to-b from-sky-100 to-gray-100 p-5 h-screen'>
        <RoomNavbar/>
        <div className='lg:mx-10 sm:my-5 sm:p-10 p-5 bg-sky-50 rounded-3xl shadow'>
            <DeviceDetail/>
        </div>
    </div>
  )
}

export default DeviceDetails
