// import React, { useContext } from 'react'
// import Logo from '../assets/logo.png'
// import {useNavigate} from "react-router-dom"
// import axios from "axios"
// import { authDataContext } from '../context/AuthContext'
// import { adminDataContext } from '../context/AdminContext'
// import { toast } from 'react-toastify'


// const Nav = () => {
//   let navigate = useNavigate()
//   const {serverUrl} = useContext(authDataContext);
//   const {getCurrentAdmin} = useContext(adminDataContext)
 
//   const handleLogout = async() => {
//         try {
//           let result = await axios.post(serverUrl + "/api/auth/logout" , {withCredentials:true})
//           await getCurrentAdmin()
//           navigate("/login")
//           console.log(result.data)
//           toast.success("Admin logged out successfully")
//         } catch (error) {
//           console.log("handleLogout error ", error )
//           toast.error("Error logging out")
//         }

//   }
//   return (
//     <div className='w-[100vw] h-[70px] bg-amber-50 fixed top-0 overflow-x-hidden flex items-center justify-between px-[30px] shadow-md shadow-black z-10'>
//       <div className='w-[30] flex items-center justify-start gap-[19px] cursor-pointer' onClick={() => navigate("/")}>
//           <img src={Logo} alt=""  className='w-[50px]' />
//           <h1 className='text-[25px] text-black font-sans font-bold'>e-Cart</h1>
//       </div>

//       <button className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white' onClick={handleLogout}>Logout</button>

//     </div>
//   )
// }

// export default Nav

import React, { useContext } from 'react'
import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Nav = () => {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { getCurrentAdmin } = useContext(adminDataContext)

  const handleLogout = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/auth/logout', {
        withCredentials: true
      })
      await getCurrentAdmin()
      navigate('/login')
      toast.success('Admin logged out successfully')
      console.log(result.data)
    } catch (error) {
      console.log('handleLogout error', error)
      toast.error('Error logging out')
    }
  }

  return (
    <>
      {/* Fixed Top Nav */}
      <header className="w-full h-16 md:h-20 bg-amber-50 fixed top-0 left-0 right-0 z-50 shadow-md shadow-gray-400 flex items-center justify-between px-4 md:px-10  ">
        {/* Logo Section */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src={Logo} alt="Logo" className="w-10 md:w-12 object-contain" />
          <h1 className="text-lg md:text-2xl font-bold text-gray-900">e-Cart</h1>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-sm md:text-base bg-black bg-opacity-80 hover:bg-black rounded-2xl px-4 md:px-6 py-2 md:py-3 text-white font-semibold border-2 border-transparent hover:border-amber-400 transition"
        >
          Logout
        </button>
      </header>

      {/* Spacer so content is below Nav */}
      <div className="h-16 md:h-20" />
    </>
  )
}

export default Nav
