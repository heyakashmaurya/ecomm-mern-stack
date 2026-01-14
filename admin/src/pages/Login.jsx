import React, { useState } from 'react'
import  { authDataContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import Logo from "../assets/logo.png"
import axios from "axios"
import { useContext } from 'react';
import { adminDataContext } from '../context/AdminContext';
import { toast } from 'react-toastify';

import Loading from '../components/Loading';



const Login = () => {

  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
  const {serverUrl}  =  useContext(authDataContext)
  let navigate = useNavigate()
  const {adminData , getCurrentAdmin} = useContext(adminDataContext)

  const handleLogin = async(e) => {
    setLoading(true)
    e.preventDefault();
        try {
          const result = await axios.post(serverUrl + "/api/auth/adminlogin", {email, password} , {withCredentials:true})
          console.log(result.data);
          toast.success("Admin logged in Successfully")
          await getCurrentAdmin();
          navigate('/')
          setLoading(false)

        } catch (error) {
          console.log("error in admin login ", error)
          toast.error(
                              error.response?.data?.message || "Invalid email or password");
        }finally{
          setLoading(false)
        }
      }
  return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-r from-slate-800 via-gray-900 to-black text-[white] flex flex-col items-center justify-start'>
                <div className='w-[100%] h-[80px] flex items-center justify-start gap-[10px] px-[30px] cursor-pointer' onClick={() => navigate("/")}>
                    <img className='w-[40px]  object-cover rounded-2xl' src={Logo} alt="" />
                    <h1 className='text-[22px] font-sans'>e-cart</h1>
                </div>
        
        
                <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
                    <span className='text-[25px] font-bold'>Admin Login</span>
                    <span className='text-[16px] '>Please Login</span>
                </div>
        
                <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        
                    <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] '>
                      
        
                        <div className='w-[90%] h-[400px] flex flex-col justify-center items-center gap-[15px] relative'>
        
                            <input type="text"  className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={email}/>
        
                            <input type={show ? "text" : "password"}  className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold flex justify-start' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password}/>
                            {!show && <IoEyeOutline className='size-[20px] cursor-pointer absolute right-[5%] bottom-[50%]' onClick={()=> {setShow(prev => !prev)}}/>}
                            {show && <IoEyeOffOutline className='size-[20px] cursor-pointer absolute right-[5%] bottom-[50%] ' onClick={()=> {setShow(prev => !prev)}}/>}
        
                            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold cursor-pointer'>{loading ? <Loading/> : "Login" } </button>
        
                        </div>
                    </form>
        
                </div>
            </div>
  )
}

export default Login