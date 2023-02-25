import { Button, Pagination, Table } from 'flowbite-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DeviceDetail from '../components/DeviceDetail';
import RoomNavbar from '../components/RoomNavbar';

function DeviceDetails() {
  const navigate = useNavigate()
  const location = useLocation()

  const [data, setData] = useState(location.state)
  const [onEdit, setOnEdit] = useState(false)

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
                          <input id="name" type={Text} value={data.device_name} className={`${onEdit ? 'bg-gray-50 outline outline-1' : 'bg-gray-200 outline-none'} rounded-lg py-0.5 px-2.5 text-sm mr-5`} disabled={onEdit ? "" : "disabled"}/>
                      </div>
                      <div className='flex lg:flex-row md:flex-col flex-row'>
                          <span className='text-sm mr-1.5 my-auto'>Code : </span>
                          <input id="name" type={Text} value={data.device_code} className={`${onEdit ? 'bg-gray-50 outline outline-1' : 'bg-gray-200 outline-none'} rounded-lg py-0.5 px-2.5 text-sm mr-5`} disabled={onEdit ? "" : "disabled"}/>
                      </div>
                      <div className='flex lg:flex-row md:flex-col flex-row'>
                          <span className='text-sm mr-1.5 my-auto'>Room : </span>
                          <input id="name" type={Text} value={data.room_id} className={`${onEdit ? 'bg-gray-50 outline outline-1' : 'bg-gray-200 outline-none'} rounded-lg py-0.5 px-2.5 text-sm mr-5`} disabled={onEdit ? "" : "disabled"}/>
                      </div>
                      <div className='flex lg:flex-row md:flex-col flex-row'>
                          <span className='text-sm mr-1.5 my-auto'>Type : </span>
                          <input id="name" type={Text} value={data.device_type} className={`${onEdit ? 'bg-gray-50 outline outline-1' : 'bg-gray-200 outline-none'} rounded-lg py-0.5 px-2.5 text-sm mr-5`} disabled={onEdit ? "" : "disabled"}/>
                      </div>
                  </div>
                  <div className="w-full flex flex-row space-x-3 py-3">
                      <Button color="dark" onClick={()=>navigate("/")}>Back</Button>
                      { onEdit ? 
                        <div className='flex flex-row space-x-3'>
                          <Button>Save</Button>
                          <Button color="warning" onClick={()=>{setOnEdit(!onEdit)}}>Cancel</Button>
                        </div>
                        :
                        <Button onClick={()=>{setOnEdit(!onEdit)}}> Edit </Button>
                      }
                      <Button color="failure"> Delete </Button>
                  </div>
              </div>

              {/* Table */}
              <div className='md:w-8/12 w-full md:-my-6'>
                  <div className='flex flex-row h-14'>
                      <input type="date" placeholder="John Doe" class="block my-2 mx-1 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                      <input type="text" placeholder="Username" class="block my-2 mx-1 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                      <button class="my-2 px-6 mx-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                          Search
                      </button>
                  </div>
                  <Table hoverable={true}>
                      <Table.Head>
                          <Table.HeadCell> Product name </Table.HeadCell>
                          <Table.HeadCell> Color </Table.HeadCell>
                          <Table.HeadCell> Category </Table.HeadCell>
                          <Table.HeadCell> Price </Table.HeadCell>
                          {/* <Table.HeadCell>
                              <span className="sr-only">
                                  Edit
                              </span>
                          </Table.HeadCell> */}
                      </Table.Head>
                      <Table.Body className="divide-y">
                          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"> Apple MacBook Pro 17" </Table.Cell>
                              <Table.Cell> Sliver </Table.Cell>
                              <Table.Cell> Laptop </Table.Cell>
                              <Table.Cell> $2999 </Table.Cell>
                              {/* <Table.Cell>
                                  <a href="/tables" className="font-medium text-blue-600 hover:underline dark:text-blue-500"> Edit </a>
                              </Table.Cell> */}
                          </Table.Row>
                      </Table.Body>
                  </Table>
                  <div className="flex mt-3 items-center justify-center text-center">
                      <Pagination currentPage={1} layout="table" onPageChange={'kjhfg'} showIcons={true} totalPages={1000}/>
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default DeviceDetails
