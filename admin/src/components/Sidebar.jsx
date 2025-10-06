import React from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  let navigate= useNavigate()
  return (
    <div className='w-[20vw] h-[100vh] border-r-[1px] border-[#a2a2a2] py-[60px] fixed left-0 top-0'>

      <div className='flex flex-col pt-[40px] pl-[20%] gap-4 text-[15px] '>

          <div className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 px-3 py-2 border-r-0 cursor-pointer hover:bg-green-400' onClick={()=> navigate("/add") }>
            <IoIosAddCircle className='size-[20px]'/>
            <p className='hidden md:block'>Add Items</p>
          </div>

          <div className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 px-3 py-2 border-r-0 cursor-pointer hover:bg-green-400' onClick={()=> navigate("/lists") }>
            <FaClipboardList className='size-[20px]'/>
            <p className='hidden md:block'>List Items</p>
          </div>

          <div className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 px-3 py-2 border-r-0 cursor-pointer hover:bg-green-400' onClick={()=> navigate("/orders") }>
            <HiShoppingBag className='size-[20px]'/>
            <p className='hidden md:block'>View Orders</p>
          </div>

      </div>

    </div>
  )
}

export default Sidebar