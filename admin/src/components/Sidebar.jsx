// import React from 'react'
// import { IoIosAddCircle } from "react-icons/io";
// import { FaClipboardList } from "react-icons/fa";
// import { HiShoppingBag } from "react-icons/hi2";
// import { useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   let navigate= useNavigate()
//   return (
//     <div className='w-[20vw] h-[100vh] border-r-[1px] border-[#a2a2a2] py-[60px] fixed left-0 top-0'>

//       <div className='flex flex-col pt-[40px] pl-[20%] gap-4 text-[15px] '>

//           <div className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 px-3 py-2 border-r-0 cursor-pointer hover:bg-green-400' onClick={()=> navigate("/add") }>
//             <IoIosAddCircle className='size-[20px]'/>
//             <p className='hidden md:block'>Add Items</p>
//           </div>

//           <div className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 px-3 py-2 border-r-0 cursor-pointer hover:bg-green-400' onClick={()=> navigate("/lists") }>
//             <FaClipboardList className='size-[20px]'/>
//             <p className='hidden md:block'>List Items</p>
//           </div>

//           <div className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 px-3 py-2 border-r-0 cursor-pointer hover:bg-green-400' onClick={()=> navigate("/orders") }>
//             <HiShoppingBag className='size-[20px]'/>
//             <p className='hidden md:block'>View Orders</p>
//           </div>

//       </div>

//     </div>
//   )
// }

// export default Sidebar

import React, { useState } from 'react'
import { IoIosAddCircle } from "react-icons/io"
import { FaClipboardList } from "react-icons/fa"
import { HiShoppingBag } from "react-icons/hi2"
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [active, setActive] = useState(location.pathname)

  const menuItems = [
    { name: "Add Items", icon: <IoIosAddCircle size={22} />, path: "/add" },
    { name: "List Items", icon: <FaClipboardList size={22} />, path: "/lists" },
    { name: "View Orders", icon: <HiShoppingBag size={22} />, path: "/orders" }
  ]

  const handleNavigate = (path) => {
    setActive(path)
    navigate(path)
  }

  return (
    <aside className="fixed top-0 left-0  h-full w-20 md:w-60 bg-white border-r border-gray-200 shadow-md flex flex-col pt-30 overflow-y-auto">
      <div className="flex flex-col gap-2 px-2 md:px-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigate(item.path)}
            className={`
              flex items-center gap-3 w-full px-3 py-2 rounded-lg transition
              ${active === item.path ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-green-100'}
            `}
          >
            <span className="text-xl md:text-2xl">{item.icon}</span>
            <span className="hidden md:block font-medium text-sm md:text-base">{item.name}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
