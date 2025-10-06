import React, { useContext } from 'react'
import Logo from '../assets/logo.png'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'


const Nav = () => {
  let navigate = useNavigate()
  const {serverUrl} = useContext(authDataContext);
  const {getCurrentAdmin} = useContext(adminDataContext)
 
  const handleLogout = async() => {
        try {
          let result = await axios.post(serverUrl + "/api/auth/logout" , {withCredentials:true})
          await getCurrentAdmin()
          navigate("/login")
          console.log(result.data)
        } catch (error) {
          console.log("handleLogout error ", error )
        }

  }
  return (
    <div className='w-[100vw] h-[70px] bg-amber-50 fixed top-0 overflow-x-hidden flex items-center justify-between px-[30px] shadow-md shadow-black z-10'>
      <div className='w-[30] flex items-center justify-start gap-[19px] cursor-pointer' onClick={() => navigate("/")}>
          <img src={Logo} alt=""  className='w-[50px]' />
          <h1 className='text-[25px] text-black font-sans font-bold'>e-Cart</h1>
      </div>

      <button className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white' onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Nav