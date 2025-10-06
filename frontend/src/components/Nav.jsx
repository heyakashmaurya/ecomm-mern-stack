import React, { useContext, useState } from 'react'
import logo from "../assets/logo.png"
import { CiSearch } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdCollections } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

const Nav = () => {
  const {getCurrentUser, userData} = useContext(userDataContext)
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false)
  const { serverUrl } = useContext(authDataContext);

  let navigate = useNavigate();

  const handleLogout = async () => {
      try {
        const result = await axios.post(serverUrl + "/api/auth/logout", { withCredentials: true });
        console.log(result.data)
        getCurrentUser()
      } catch (error) {
        console.log("Error in handleLogout:", error);
      }
    };

  return (
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black '>
      <div className='w-[75%] lg:w-[30%] flex items-center justify-start gap-[10px] '> 
        <img src={logo} alt="" className='lg:w-[50px] w-[35px] ' />
        <h1 className='md:text-[25px] text-[20px] text-black italic  font-semibold'>e-cart</h1>
      </div>

      <div className='w-[50%] lg:w-[40%] hidden md:flex'>
          <ul className='flex items-center justify-center gap-[19px] text-white '>
            <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl ' onClick={() => navigate("/")}>HOME</li>
            <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl ' onClick={() => navigate("/collection")} >COLLECTIONS</li>
            <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl ' onClick={() => navigate("/about")} >ABOUT</li>
            <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl '  onClick={() => navigate("/contact")}>CONTACT</li>
          </ul>
      </div>

      <div className='w-[30%] flex items-center justify-end gap-[20px] '>
        {!showSearch && <CiSearch className='size-[32px] cursor-pointer text-[#000000]' onClick={()=> setShowSearch(prev =>!prev)}/>}
        {showSearch && <IoSearchCircleSharp  className='size-[32px] cursor-pointer text-[#000000]' onClick={()=> setShowSearch(prev =>!prev)}/>}
        {!userData && <FaCircleUser className='size-[29px] cursor-pointer text-[#000000]' onClick={() => setShowProfile(prev => !prev)}/> }
        {userData && <div className='size-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer' onClick={() => setShowProfile(prev => !prev)}>{userData?.name.slice(0,1).toUpperCase()}</div>}
        <BsCart2 className='size-[32px] cursor-pointer text-[#000000] hidden md:block'/>
        <p className='absolute w-[18px] items-center  justify-center bg-black px-[5px] py-[2px] text-white rounded-full text-[9px] right-[23px] hidden md:block'>10</p>

      </div>

      {showSearch && <div className='w-[100%] lg:h-[80px] h-[70%] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center '>
        <input type="text" className='lg:w-[50%] w-[80%] h-[55%] bg-[#FFFFFF] rounded-[30px] px-[50px] placeholder:text-black text-[18px] ' placeholder='Search here' />
      </div>}

      
      {showProfile && <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10 '>
        <ul className='w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-white '>
          {!userData && <li className='w-[1005] hover:bg-[#3f3f3f] px-[15px] py-[10px] cursor-pointer'onClick={()=> {navigate("/login"); setShowProfile(false)}}>Login</li>}
          {userData && <li className='w-[1005] hover:bg-[#3f3f3f] px-[15px] py-[10px] cursor-pointer'onClick={() => {handleLogout();
            setShowProfile(false)}}>LogOut</li>}
          <li className='w-[1005] hover:bg-[#3f3f3f] px-[15px] py-[10px] cursor-pointer'>Orders</li>
          <li className='w-[1005] hover:bg-[#3f3f3f] px-[15px] py-[10px] cursor-pointer' onClick={()=> {navigate("/about"); setShowProfile(false)}} >About</li>
        </ul>
      </div>}

     { <div className='w-[100vw] h-[70px] bg-[#191818] fixed bottom-0 left-0 flex items-center justify-between px-[20px] text-[12px] md:hidden'>
      <button className='text-white flex items-center justify-center flex-col gap-[2px] cursor-pointer' onClick={() => navigate("/")}> <FaHome className='size-[23px] text-white md:hidden'/> Home</button>
      <button className='text-white flex items-center justify-center flex-col gap-[2px] cursor-pointer' onClick={() => navigate("/collection")}> <MdCollections className='size-[23px] text-white md:hidden'/> Collections</button>
      <button className='text-white flex items-center justify-center flex-col gap-[2px] cursor-pointer' onClick={() => navigate("/contact")}> <FaPhoneAlt className='size-[23px] text-white md:hidden'/> Contact</button>
      <button className='text-white flex items-center justify-center flex-col gap-[2px] cursor-pointer' onClick={() => navigate("/cart")}> <BsCart2 className='size-[23px] text-white md:hidden'/> Cart</button>
      <p className='absolute size-[18px] bg-white text-black top-[8px] right-[18px] rounded-full flex items-center justify-center font-semibold '>10</p>
      </div>}
    </div>
  )
}

export default Nav



