import { Badge, Button, Card, Dropdown, Label, Modal, Navbar, Textarea, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { FaPen, FaPlus } from "react-icons/fa";
const axios = require('axios');

function RoomNavbar() {
    const [show, setShow] = useState(false)
    const [newRoomName, setNewRoomName] = useState('')
    const [newRoomDesc, setNewRoomDesc] = useState('')

    const saveRoom = () => {
        const data = {
            room_name: newRoomName,
            room_desc: newRoomDesc
        }

        if(newRoomName != '' && newRoomDesc != ''){
            // Send Data to db
            axios.post('', data)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        } else {
            
        }
    }

    return (
        <>
            <Navbar fluid={false} rounded={true} className='!bg-transparent !py-0'>
                <Navbar.Brand>
                    <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">
                        SmartLab
                    </span>
                </Navbar.Brand>
                <Dropdown label="Ruangan Lab 1" inline={true}>
                    <Dropdown.Item> Ruangan Lab 2 </Dropdown.Item>
                </Dropdown>
                <div className='grid grid-cols-3 gap-2 sm:mx-0 my-3'>
                    <Button onClick={()=>setShow(!show)} 
                        className='!py-0 !px-0 !h-10 !w-10 !bg-blue-900 hover:!bg-blue-800 !rounded-full shadow-md hover:shadow-xl hover:scale-110 transition ease-in-out duration-650'>
                        <FaPlus className='h-4 w-4 text-gray-50'/>
                    </Button>
                    <Button 
                        className='!py-0 !px-0 !h-10 !w-10 !bg-blue-900 hover:!bg-blue-800 !rounded-full shadow-md hover:shadow-xl hover:scale-105 transition ease-in-out duration-650'>
                        <FaPen className='h-4 w-4 text-gray-50'/>
                    </Button>
                    <Button 
                        className='!py-0 !px-0 !h-10 !w-10 !bg-blue-900 hover:!bg-blue-800 !rounded-full shadow-md hover:shadow-xl hover:scale-105 transition ease-in-out duration-650'>
                        <FaPen className='h-4 w-4 text-gray-50'/>
                    </Button>
                    {/* <button className='mx-2 bg-blue-900 hover:bg-blue-700 rounded-full p-3'><FaPen className='h-4 w-4 text-gray-50'/></button> */}
                </div>
            </Navbar>
            {/* modals */}
            <Modal show={show} size="md" popup={true} onClose={()=>setShow(!show)} className='h-screen'>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 px-0 pb-4 sm:pb-6 lg:px-8 xl:pb-8 my-auto">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white"> Add Room </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Room name"/>
                            </div>
                            {newRoomName}
                            <TextInput id="name" required={true} onChange={(e)=>{setNewRoomName(e.target.value)}} value={newRoomName}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Room description"/>
                            </div>
                            {newRoomDesc}
                            <Textarea id="description" placeholder="Leave a description..." required={true} rows={4} onChange={(e)=>{setNewRoomDesc(e.target.value)}} value={newRoomDesc}/>
                        </div>
                        <div className="w-full" onClick={()=>{saveRoom()}}>
                            <Button> Add </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RoomNavbar