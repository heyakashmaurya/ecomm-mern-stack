import React, { useContext, useState } from 'react'
import Logo from "../assets/logo.png"
import Google from "../assets/Google.jpg"
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { auth, provider } from '../../utils/Firebase';
import { signInWithPopup } from 'firebase/auth';
import { userDataContext } from '../context/UserContext';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';



const login = () => {
   const [show, setShow] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const {serverUrl} = useContext(authDataContext);
    const {getCurrentUser} = useContext(userDataContext)
    
    

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        
        try {
            const result = await axios.post(serverUrl + "/api/auth/login" , {email, password},{withcredentials:true})
            navigate("/")
            
            getCurrentUser();
            setLoading(false);
        } catch (error) {
            console.log("error in handlelogin " , error.message)
            toast.error(
                    error.response?.data?.message || "Invalid email or password");
        }finally{
            setLoading(false);
        }
    }

    const googleLogin = async ( )=> {
        setLoading(true)
        try {
            const response = await signInWithPopup(auth, provider)
            console.log(response);
            let user = response.user;
            let name = user.displayName;
            let email = user.email;

            const result = await axios.post(serverUrl + '/api/auth/googlelogin',{name, email}, {withCredentials:true})
            getCurrentUser();
            navigate("/")
            setLoading(false);
            toast.success("Login Successful")

            console.log(result.data)
        } catch (error) {
            console.log("error in googlesignup  ", error)
            toast.error("Google login failed" )
            toast.error(
      error.response?.data?.message || "Invalid email or password"
    );
        }finally{
            setLoading(false);
        }
    }
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-r from-slate-800 via-gray-900 to-black text-[white] flex flex-col items-center justify-start'>
        <div className='w-[100%] h-[80px] flex items-center justify-start gap-[10px] px-[30px] cursor-pointer' onClick={() => navigate("/")}>
            <img className='w-[40px]  object-cover rounded-2xl' src={Logo} alt="" />
            <h1 className='text-[22px] font-sans'>Ecomm</h1>
        </div>


        <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
            <span className='text-[25px] font-bold'>Login Page</span>
            <span className='text-[16px] '>Welcome to Ecomm, Place your order</span>
        </div>

        <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>

            <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] '>
                <div className= 'w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleLogin}>
                    <img src={Google} alt="" className='w-[20px] rounded-2xl' /> Login with google
                </div>

                <div className='w-[1005] h-[20px] flex items-center justify-center gap-[10px]'>
                    <div className='w-[40%] h-[1px] bg-[#96969635]'></div>OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                </div>

                <div className='w-[90%] h-[400px] flex flex-col justify-center items-center gap-[15px] relative'>

                    <input type="text"  className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={email}/>

                    <input type={show ? "text" : "password"}  className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold flex justify-start' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password}/>
                    {!show && <IoEyeOutline className='size-[20px] cursor-pointer absolute right-[5%] bottom-[56%]' onClick={()=> {setShow(prev => !prev)}}/>}
                    {show && <IoEyeOffOutline className='size-[20px] cursor-pointer absolute right-[5%] bottom-[56%] ' onClick={()=> {setShow(prev => !prev)}}/>}

                    <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold cursor-pointer' >{loading ? <Loading/> : "Login"}</button>

                    <p>Doesn't have Account?  <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={() => navigate("/signup")}> Create New Account</span></p>
                </div>
            </form>

        </div>
    </div>
  )
}

export default login
