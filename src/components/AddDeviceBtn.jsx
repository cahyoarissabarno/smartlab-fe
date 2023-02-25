import { Button, Label, Modal, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";

function AddDeviceBtn() {
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [type, setType] = useState('')

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
                            <Label htmlFor="name" value="Room name"/>
                        </div>
                        <TextInput id="name" required={true} onChange={(e)=>{setName(e.target.value)}} value={name}/>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="code" value="Tuya Code"/>
                        </div>
                        <TextInput id="code" required={true} onChange={(e)=>{setCode(e.target.value)}} value={code}/>
                    </div>
                    <div className="w-full" onClick={()=>{}}>
                        <Button> Add </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default AddDeviceBtn