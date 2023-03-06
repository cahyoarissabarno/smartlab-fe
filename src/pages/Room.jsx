import React, { useEffect, useState } from 'react'
import AddDeviceBtn from '../components/AddDeviceBtn';
import DeviceCard from '../components/DeviceCard';
import RoomNavbar from '../components/RoomNavbar';
import axios from 'axios';

function Room() {
    const [allRoom, setAllRoom] = useState([])
    const [devices, setDevices] = useState([])
    const [selectedRoom, setSelectedRoom] = useState({})

    const host = import.meta.env.VITE_API_HOST
    const port = import.meta.env.VITE_API_PORT

    useEffect(() => {
        console.log(import.meta.env.VITE_API_HOST)
        getAllRoom()
    }, [])

    const getAllRoom = async() => {
        axios.get(`http://${host}:${port}/api/v1/room`)
        .then(function (res) {
            getDevices(res.data.data[0].id)
            setAllRoom(res.data.data)
            setSelectedRoom(res.data.data[0])
            console.log(res.data.data);
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    const getDevices = async(id) => {
        axios.get(`http://${host}:${port}/api/v1/device/room/${id}`)
        .then(function (res) {
            setDevices(res.data.data)
            console.log(res.data.data);
        })
        .catch(function (err) {
            setDevices([])
            console.log(err);
        });
    }

  return (
    <div className='bg-gradient-to-b from-sky-100 to-gray-100 p-5 h-screen'>
        <RoomNavbar selectedRoom={selectedRoom} getDevices={getDevices} allRoom={allRoom} setSelectedRoom={setSelectedRoom} getAllRoom={getAllRoom}/>
        <div className='lg:mx-10 sm:my-5 sm:p-10 p-5 bg-sky-50 rounded-3xl shadow'>
            {/* Room Details */}
            {/* <Tabs.Group aria-label="Pills" style="pills">
                <Tabs.Item active={true} title="Device"> */}
                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 sm:mx-4'>
                        <AddDeviceBtn room_id={selectedRoom.id} getDevices={getDevices} />
                        {devices && devices.map((val, i)=>{
                            return (
                                <DeviceCard key={i} data={val} address={selectedRoom.address}/>
                            )
                        })}
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
