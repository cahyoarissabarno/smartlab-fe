import { Button, Dropdown, Label, Modal, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import axios from 'axios';

function AddDeviceBtn({room_id}) {
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [type, setType] = useState('')

    const host = import.meta.env.VITE_API_HOST_LOCAL
    const port = import.meta.env.VITE_API_PORT_LOCAL

    const saveDevice = async() => {
        const data = {
            device_code: code,
            user_id: 1,
            device_name: name, 
            device_type: type,
            room_id
        }
        // console.log(data)
        if(code != '' && name != '' && type != ''){
            // Send Data to db
            axios.post(`http://${host}:${port}/api/v1/device/create`, data)
              .then(function (response) {
                setShow(!show)
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        } else {
            console.log('pastikan semua telah terisi')
        }
    }

    return (
        <>
        <button className='text-left' onClick={()=>{setShow(!show)}}>
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
        {/* modals */}
        <Modal show={show} size="md" popup={true} onClose={()=>setShow(!show)} className='h-screen'>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6 px-0 pb-4 sm:pb-6 lg:px-8 xl:pb-8 my-auto">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white"> Add Device </h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Device name"/>
                        </div>
                        <TextInput id="name" required={true} onChange={(e)=>{setName(e.target.value)}} value={name}/>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="code" value="Tuya Code"/>
                        </div>
                        <TextInput id="code" required={true} onChange={(e)=>{setCode(e.target.value)}} value={code}/>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="code" value="Device Type"/>
                        </div>
                        <Dropdown label={type == '' ? "Choose Type" : type} inline={true}>
                            <Dropdown.Item onClick={()=>{setType('Lamp')}}> Lamp </Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setType('Plug')}}> Plug </Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setType('Wallswitch')}}> Wallswitch </Dropdown.Item>
                        </Dropdown>
                    </div>
                    <div className="w-full" onClick={()=>{saveDevice()}}>
                        <Button> Add </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default AddDeviceBtn