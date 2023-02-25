import { Badge, Button, Card, Dropdown, Label, Modal, Navbar, Textarea, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaPen, FaPlus } from "react-icons/fa";
import axios from 'axios';

function RoomNavbar({selectedRoom, allRoom, setSelectedRoom, getAllRoom, getDevices}) {
    const [show, setShow] = useState(false)
    const [newRoomName, setNewRoomName] = useState('')
    const [newAddress, setNewAddress] = useState('')
    // const [allRoom, setAllRoom] = useState([])
    // const [selectedRoom, setSelectedRoom] = useState({})
    const [mode, setMode] = useState('')

    const host = import.meta.env.VITE_API_HOST
    const port = import.meta.env.VITE_API_PORT

    const saveRoom = async() => {
        const data = {
            room_name: newRoomName,
            address: newAddress
        }
        console.log(data)
        if(newRoomName != '' && newAddress != ''){
            // Send Data to db
            axios.post(`http://${host}:${port}/api/v1/room`, data)
              .then(function (response) {
                setShow(!show)
                getAllRoom()
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        } else {
            console.log('pastikan semua telah terisi')
        }
    }

    const updateRoom = async() => {
        const data = {
            new_name: newRoomName,
            new_address: newAddress
        }
        console.log({data,id: selectedRoom.id})
        if(newRoomName != '' && newAddress != ''){
            // Send Data to db
            axios.put(`http://${host}:${port}/api/v1/room/${selectedRoom.id}`, data)
              .then(function (response) {
                setShow(!show)
                getAllRoom()
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        } else {
            console.log('pastikan semua telah terisi')
        }
    }

    const deleteRoom = async() => {
        axios.delete(`http://${host}:${port}/api/v1/room/${selectedRoom.id}`)
            .then(function (response) {
                setShow(!show)
                getAllRoom()
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <Navbar fluid={false} rounded={true} className='!bg-transparent !py-0'>
                <Navbar.Brand>
                    <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">
                        SmartLab
                    </span>
                </Navbar.Brand>
                <Dropdown label={selectedRoom.room_name} inline={true}>
                    {allRoom && allRoom.map((val, i)=>{
                        return (
                            <Dropdown.Item key={i} onClick={()=>{setSelectedRoom(val); getDevices(val.id)}}> {val.room_name} </Dropdown.Item>
                        )
                    })} 
                </Dropdown>
                {selectedRoom.address}
                {/* {selectedRoom.id} */}
                <div className='grid grid-cols-3 gap-2 sm:mx-0 my-3'>
                    <Button onClick={()=>{setShow(!show); setNewRoomName(''); setNewAddress(''); setMode('Add')}} 
                        className='!py-0 !px-0 !h-10 !w-10 !bg-blue-900 hover:!bg-blue-800 !rounded-full shadow-md hover:shadow-xl hover:scale-110 transition ease-in-out duration-650'>
                        <FaPlus className='h-4 w-4 text-gray-50'/>
                    </Button>
                    <Button onClick={()=>{setShow(!show); setNewRoomName(selectedRoom.room_name); setNewAddress(selectedRoom.address); setMode('Edit')}}
                        className='!py-0 !px-0 !h-10 !w-10 !bg-blue-900 hover:!bg-blue-800 !rounded-full shadow-md hover:shadow-xl hover:scale-105 transition ease-in-out duration-650'>
                        <FaPen className='h-4 w-4 text-gray-50'/>
                    </Button>
                    {/* <Button 
                        className='!py-0 !px-0 !h-10 !w-10 !bg-blue-900 hover:!bg-blue-800 !rounded-full shadow-md hover:shadow-xl hover:scale-105 transition ease-in-out duration-650'>
                        <FaPen className='h-4 w-4 text-gray-50'/>
                    </Button> */}
                    {/* <button className='mx-2 bg-blue-900 hover:bg-blue-700 rounded-full p-3'><FaPen className='h-4 w-4 text-gray-50'/></button> */}
                </div>
            </Navbar>
            {/* modals */}
            <Modal show={show} size="md" popup={true} onClose={()=>setShow(!show)} className='h-screen'>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 px-0 pb-4 sm:pb-6 lg:px-8 xl:pb-8 my-auto">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white"> {mode} Room </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Room name"/>
                            </div>
                            <TextInput id="name" required={true} onChange={(e)=>{setNewRoomName(e.target.value)}} value={newRoomName}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="address" value="Blockchain Address"/>
                            </div>
                            <TextInput id="address" required={true} onChange={(e)=>{setNewAddress(e.target.value)}} value={newAddress}/>
                        </div>
                        {mode == 'Add' ? 
                            <div className="w-full" onClick={()=>{saveRoom()}}>
                                <Button> Add </Button>
                            </div>
                            :
                            <div className="w-full flex flex-row space-x-3">
                                <Button onClick={()=>{updateRoom()}}> Edit </Button>
                                <Button className='!bg-red-600' onClick={()=>{deleteRoom()}}> Delete </Button>
                            </div>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RoomNavbar