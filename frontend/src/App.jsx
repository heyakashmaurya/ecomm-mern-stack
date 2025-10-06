import React, { useContext } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home' 
import Login from './pages/Login'
import Registration from './pages/Registration'
import Nav from "./components/Nav"
import Logout from './pages/Logout'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userDataContext } from './context/UserContext'
import About from './pages/About'
import Collections from './pages/collections'
import Product from './pages/Product'
import Contact from './pages/Contact'
import Cart from './pages/Cart'


axios.defaults.withCredentials = true;
const App = () => {
  let {userData} = useContext(userDataContext);
  return (
    <>
    <Nav/> 
    <Routes>
      <Route path='/login'
       element={
         userData ? (<Navigate to={location.state?.from || "/"}/> ) 
         :(<Login/>) }/>

      <Route path='/signup' element={
        userData ? (<Navigate to={location.state?.from || "/"}/> ) 
        :(<Registration/>)
      }/>

      <Route path='/' element={<Home/>}/>

      <Route path="/logout" element={<Logout />} />

      <Route path="/about" element={<About />} />

      <Route path="/collection" element={<Collections />} />

      <Route path="/product" element={<Product />} />
      
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart/>} />
    </Routes>

     <ToastContainer />
    </>
  )
}

export default App




