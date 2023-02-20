import React, { useState } from 'react'
import AddDeviceBtn from '../components/AddDeviceBtn';
import DeviceCard from '../components/DeviceCard';
import RoomNavbar from '../components/RoomNavbar';

function Room() {

  return (
    <div className='bg-gradient-to-b from-sky-100 to-gray-100 p-5 h-screen'>
        <RoomNavbar/>
        <div className='lg:mx-10 sm:my-5 sm:p-10 p-5 bg-sky-50 rounded-3xl shadow'>
            {/* Room Details */}
            {/* <Tabs.Group aria-label="Pills" style="pills">
                <Tabs.Item active={true} title="Device"> */}
                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 sm:mx-4'>
                        <AddDeviceBtn/>
                        <DeviceCard/>
                    </div>
                {/* </Tabs.Item>
                <Tabs.Item title="Assets">
                    All Asset In The Room
                </Tabs.Item>
            </Tabs.Group> */}

            {/* Device Details */}
            {/* <DeviceDetails/> */}
        </div>
    </div>
  )
}

export default Room
