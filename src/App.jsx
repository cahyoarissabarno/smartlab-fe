import React, { Fragment, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DeviceDetails from './pages/DeviceDetails'
import Room from './pages/Room'
import RoomDetails from './pages/RoomDetails'

function App() {

  return (
    // <div className="App">

    // </div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Room/>} />
        <Route path='/room' element={<RoomDetails/>} />
        <Route path='/device' element={<DeviceDetails/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
