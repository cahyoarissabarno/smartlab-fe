// import { data, data } from 'autoprefixer';
import axios from 'axios';
import { Button, Dropdown, Modal, Pagination, Spinner, Table, Tabs } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Web3 from 'web3';
import {BsEyeFill} from 'react-icons/bs'
import {AiFillLock, AiFillUnlock, AiOutlineWarning} from 'react-icons/ai'

const web3 = new Web3()

function DeviceDetails() {
  const navigate = useNavigate()
  const location = useLocation()

  const host = import.meta.env.VITE_API_HOST
  const port = import.meta.env.VITE_API_PORT

  const [onLoad, setOnLoad] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [onDelete, setOnDelete] = useState(false)
  const [data, setData] = useState(location.state.data)
  const [history, setHistory] = useState([])
  const [page, setPage] = useState(1)
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState({})
  const [decoded, setDecoded] = useState({})

    useEffect(() => {
        getHistory()
        // console.log(location.state)
    }, [])

    const decode = async (data, topics) => {
        console.log('data', data)
        console.log('topics', topics)
        const decoded = web3.eth.abi.decodeLog(
            [
                {
                    "indexed": true,
                    "name": "user_id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "device_id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "date",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "message",
                    "type": "string"
                }
            ], data, [topics[1],topics[2],topics[3]]
        )
        console.log('decoded',decoded)
        return decoded
    }

    const viewData = async (val) => {
        const decodedData = await decode(val.data, val.topics)
        setShow(!show)
        setSelected(val)
        setDecoded(decodedData)
    }

    const deleteDevice = async() => {
        axios.delete(`http://${host ? host : '103.106.72.182'}:${port ? port : '36004'}/api/v1/device/${data.id}`)
            .then(function (response) {
                console.log(response);
                navigate("/")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const updateDevice = async() => {
        console.log('data', data)
        const newData = {
            device_code: data.device_code,
            user_id: data.user_id,
            device_name: data.device_name, 
            device_type: data.device_type,
            room_id: data.room_id
        }
        console.log(newData)
        console.log(`http://${host ? host : '103.106.72.182'}:${port ? port : '36004'}/api/v1/device/${data.id}`)
        if(newData){
            axios.put(`http://${host ? host : '103.106.72.182'}:${port ? port : '36004'}/api/v1/device/${data.id}`, newData)
              .then(function (response) {
                setOnEdit(!onEdit)
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        } else {
            console.log('pastikan semua telah terisi')
        }
    }

    const getHistory = () => {
        const payload = {
            address: location.state.address,
            device_id: data.id,
            page 
        }
        setOnLoad(true)
        axios.post(`http://${host ? host : '103.106.72.182'}:${port ? port : '36004'}/api/v1/history`, payload)
        .then(function (res) {
            setHistory(res.data)
            setOnLoad(false)
            // console.log(res.data);
        })
        .catch(function (err) {
            console.log(err);
            setOnLoad(false)
        });
    }

    const parseMessage = (data) => {
        const type = data[0].code
        if(type != 'countdown_1'){
            return `The device is turned ${data[0].value == true ? 'on' : 'off'}`
        } else {
            return `The device is scheduled to turn on ${data[0].value} seconds from now`
        }
    }

    const changePage = async (page) => {
        setPage(page)
        getHistory()
    }

  return (
    <div className='bg-gradient-to-b from-sky-100 to-gray-100 p-5 h-screen'>
        {/* <RoomNavbar/> */}
        <div className='lg:mx-10 sm:my-5 sm:p-10 p-5 bg-sky-50 rounded-3xl shadow'>
            {/* <DeviceDetail/> */}
            {/* {console.log(data)} */}
            <div className='flex flex-wrap md:flex-row flex-col'>
              <div className='md:w-4/12 w-full'>
                  <p className='self-center lg:text-3xl md:text-2xl text-3xl font-medium dark:text-white'>{data.device_name}</p>
                  <div className="space-y-2 px-0 md:my-7 my-auto md:static flex flex-wrap">
                      <div className='flex lg:flex-row md:flex-col flex-row'>
                          <span className='text-sm mr-1.5 my-auto'>Name : </span>
                          <input id="name" type="text" onChange={(e)=>{setData({...data, device_name: e.target.value})}} value={data.device_name} className={`${onEdit ? 'bg-gray-50 outline outline-1' : 'bg-gray-200 outline-none'} rounded-lg py-0.5 px-2.5 text-sm mr-5`} disabled={onEdit ? "" : "disabled"}/>
                      </div>
                      <div className='flex lg:flex-row md:flex-col flex-row'>
                          <span className='text-sm mr-1.5 my-auto'>Code : </span>
                          <input id="name" type="text" onChange={(e)=>{setData({...data, device_code: e.target.value})}} value={data.device_code} className={`${onEdit ? 'bg-gray-50 outline outline-1' : 'bg-gray-200 outline-none'} rounded-lg py-0.5 px-2.5 text-sm mr-5`} disabled={onEdit ? "" : "disabled"}/>
                      </div>
                      <div className='flex lg:flex-row md:flex-col flex-row'>
                          <span className='text-sm mr-1.5 my-auto'>Room : </span>
                          <input id="name" type="text" onChange={(e)=>{setData({...data, room_id: e.target.value})}} value={data.room_id} className={`${onEdit ? 'bg-gray-50 outline outline-1' : 'bg-gray-200 outline-none'} rounded-lg py-0.5 px-2.5 text-sm mr-5`} disabled={onEdit ? "" : "disabled"}/>
                      </div>
                      <div className='flex lg:flex-row md:flex-col flex-row'>
                          <span className='text-sm mr-1.5 my-auto'>Type : </span>
                          {onEdit ? 
                            <div className={`!bg-gray-50 outline outline-1 !rounded-lg !py-0.5 !px-2.5 !text-sm mr-5`}>
                                <Dropdown label={data.device_type} inline={true} dismissOnClick={true}>
                                    <Dropdown.Item onClick={()=>{setData({...data, device_type: 'Lamp'})}}> Lamp </Dropdown.Item>
                                    <Dropdown.Item onClick={()=>{setData({...data, device_type: 'Plug'})}}> Plug </Dropdown.Item>
                                    <Dropdown.Item onClick={()=>{setData({...data, device_type: 'Wallswitch'})}}> Wallswitch </Dropdown.Item>
                                    <Dropdown.Item onClick={()=>{setData({...data, device_type: 'Wallsocket'})}}> Wallsocket </Dropdown.Item>
                                </Dropdown>
                            </div>
                            : 
                            <input id="name" type="text" placeholder={data.device_type} className={`bg-gray-200 outline-none rounded-lg py-0.5 px-2.5 text-sm mr-5 placeholder-black`}/>
                          }
                      </div>
                  </div>
                  <div className="w-full flex flex-row space-x-3 py-3">
                      <Button color="dark" onClick={()=>navigate("/")}>Back</Button>
                      { onEdit ? 
                        <div className='flex flex-row space-x-3'>
                          <Button onClick={()=>{updateDevice()}}>Save</Button>
                          <Button color="warning" onClick={()=>{setOnEdit(!onEdit); setData(location.state.data)}}>Cancel</Button>
                        </div>
                        :
                        <Button onClick={()=>{setOnEdit(!onEdit)}}> Edit </Button>
                      }
                      <Button color="failure" onClick={()=>{setOnDelete(true)}}> Delete </Button>
                  </div>
              </div>

              {/* Blockchain Data Table */}
              <div className='md:w-8/12 w-full md:-my-6'>
                  {/* <div className='flex flex-row h-14'>
                      <input type="date" placeholder="John Doe" class="block my-2 mx-1 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                      <input type="text" placeholder="Username" class="block my-2 mx-1 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                      <button class="my-2 px-6 mx-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                          Search
                      </button>
                  </div> */}
                  <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell> Time </Table.HeadCell>
                        <Table.HeadCell> Data </Table.HeadCell>
                        <Table.HeadCell></Table.HeadCell>
                    </Table.Head>
                        <Table.Body className="divide-y">
                        { onLoad ?
                        <Table.Row>
                            <Table.Cell>
                                <div className='text-center py-5'>
                                    <Spinner/>
                                    <span className="pl-3">
                                        Loading...
                                    </span>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className='text-center py-5'>
                                    <Spinner/>
                                    <span className="pl-3">
                                        Loading...
                                    </span>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                        : history && history.map((val, i)=>{
                            return (
                                <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"> {new Date(val.date).toUTCString()} </Table.Cell>
                                    {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"> {val.date} </Table.Cell> */}
                                    <Table.Cell className='!inline-block max-w-sm'><p className='!text-ellipsis overflow-hidden'> {val.data} </p></Table.Cell>
                                    <Table.Cell>
                                        <button onClick={()=>{viewData(val)}} className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                            <BsEyeFill className='h-5 w-5 text-gray-800'/>
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}                  
                        </Table.Body>
                  </Table>
                  <div className="flex mt-3 items-center justify-center text-center">
                    {/* {console.log(history[0] ? history[0] :'gk ada')} */}
                      <Pagination 
                        currentPage={page} 
                        onPageChange={(p)=>changePage(p)} 
                        totalPages={history[0] ? Math.ceil(history[0].length/5) : 10}
                    />
                  </div>
              </div>

            {/* Blockchain Detail Data Modal */}
            <Modal show={show} size="md" popup={true} onClose={()=>setShow(!show)} className='h-screen'>
                <Modal.Header />
                <Modal.Body>
                    <Tabs.Group aria-label="Tabs with icons" style="underline" className='-mt-4'>
                    {/* Encrypted */}
                    <Tabs.Item active={true} title="Encrypted" icon={ AiFillLock }>
                        <div className="space-y-2 px-0 my-auto md:static flex flex-col">
                            <div className='flex flex-wrap'>
                                <span className='text-sm mr-1.5 my-auto font-bold'>Block Number : </span>
                                <span className={`py-0.5 px-1 text-sm mr-5 break-all`}>{selected.blockNumber}</span>
                            </div>
                            <div className='flex flex-wrap'>
                                <span className='text-sm mr-1.5 my-auto font-bold'>Block Hash : </span>
                                <span className={`py-0.5 px-1 text-sm mr-5 break-all`}>{selected.blockHash}</span>
                            </div>
                            <div className='flex flex-wrap'>
                                <span className='text-sm mr-1.5 my-auto font-bold'>Transaction Hash : </span>
                                <span className={`py-0.5 px-1 text-sm mr-5 break-all`}>{selected.transactionHash}</span>
                            </div>
                            <div className='flex flex-wrap'>
                                <span className='text-sm mr-1.5 my-auto font-bold'>Data : </span>
                                <span className={`py-0.5 px-1 text-sm mr-5 break-all`}>{selected.data}</span>
                            </div>
                            <div className='flex flex-wrap'>
                                <span className='text-sm mr-1.5 my-auto font-bold'>Date : </span>
                                <span className={`py-0.5 px-1 text-sm mr-5 break-all`}>{selected.date}</span>
                            </div>
                        </div>
                    </Tabs.Item>

                    {/* Decripted */}
                    <Tabs.Item title="Decrypted" icon={ AiFillUnlock }>
                        <div className="space-y-2 px-0 my-auto md:static flex flex-col">
                            {/* <div className='flex flex-wrap'>
                                <span className='text-sm mr-1.5 my-auto font-bold'>User ID : </span>
                                <span className={`py-0.5 px-1 text-sm mr-5 break-all`}>{decoded.user_id}</span>
                            </div> */}
                            <div className='flex flex-wrap'>
                                <span className='text-sm mr-1.5 my-auto font-bold'>Device ID : </span>
                                <span className={`py-0.5 px-1 text-sm mr-5 break-all`}>{decoded.device_id}</span>
                            </div>
                            {/* <div className='flex flex-wrap'>
                                <span className='text-sm mr-1.5 my-auto font-bold'>From : </span>
                                <span className={`py-0.5 px-1 text-sm mr-5 break-all`}>{decoded.from}</span>
                            </div> */}
                            <div className='flex flex-col'>
                                <span className='text-sm mr-1.5 my-auto font-bold'>Message : </span>
                                {/* <span className={`py-0.5 px-1 text-sm mr-5 break-all`}><pre> {decoded.message && JSON.stringify(JSON.parse(web3.utils.hexToUtf8(decoded.message)).commands, null, 2)} </pre> </span> */}
                                <span className={`py-0.5 px-1 text-sm mr-5 break-all`}>{decoded.message && parseMessage(JSON.parse(web3.utils.hexToUtf8(decoded.message)).commands)}</span>
                            </div>
                            <div className='flex flex-wrap'>
                                <span className='text-sm mr-1.5 my-auto font-bold'>Date : </span>
                                <span className={`py-0.5 px-1 text-sm mr-5 break-all`}>{new Date(Number(decoded.date)).toUTCString()}</span>
                            </div>
                        </div>
                    </Tabs.Item>
                    </Tabs.Group>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={onDelete} size="md" popup={true} onClose={()=>setOnDelete(false)} className='h-screen'>
                <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    <AiOutlineWarning className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this device ?
                    </h3>
                    <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={()=>{ deleteDevice() }}>
                        Yes, I'm sure
                    </Button>
                    <Button color="gray" onClick={()=>setOnDelete(false)}>
                        No, cancel
                    </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
          </div>
        </div>
    </div>
  )
}

export default DeviceDetails
