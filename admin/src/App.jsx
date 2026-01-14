import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Add from './pages/Add'
import Lists from './pages/Lists'
import Orders from './pages/Orders'
import Login from './pages/Login'
import axios from "axios"
import { adminDataContext } from './context/AdminContext'
import { ToastContainer, toast } from 'react-toastify';

axios.defaults.withCredentials = true;


const App = () => {
  const {adminData} = useContext(adminDataContext)
  return (
    <>
    {!adminData ? <Login/> : <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/add' element={<Add/>}/>
      <Route path='/lists' element={<Lists/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/login' element={<Login/>}/>
      
    </Routes>
    <ToastContainer />
    </>
    }
    </>
  )
}

export default App