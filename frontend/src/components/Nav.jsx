// import React, { useContext, useState } from 'react'
// import logo from "../assets/logo.png"
// import { CiSearch } from "react-icons/ci";
// import { FaCircleUser } from "react-icons/fa6";
// import { BsCart2 } from "react-icons/bs";
// import { IoSearchCircleSharp } from "react-icons/io5";
// import { FaHome } from "react-icons/fa";
// import { FaPhoneAlt } from "react-icons/fa";
// import { MdCollections } from "react-icons/md";
// import { userDataContext } from '../context/UserContext';
// import {useNavigate} from "react-router-dom"
// import axios from 'axios';
// import { authDataContext } from '../context/AuthContext';
// import { shopDataContext } from '../context/ShopContext';
// import { toast } from 'react-toastify';

// const Nav = () => {
//   const {getCurrentUser, userData} = useContext(userDataContext)
//   const {showSearch, setShowSearch, search, setSearch,getCartCount,getUserCart} = useContext(shopDataContext)
//   const [showProfile, setShowProfile] = useState(false)
//   const { serverUrl } = useContext(authDataContext);

//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const result = await axios.post(serverUrl + "/api/auth/logout", { withCredentials: true });
//       console.log(result.data)
//       toast.success("Logged out successfully");
//       getCurrentUser()
//     } catch (error) {
//       console.log("Error in handleLogout:", error);
//     }
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 z-20 bg-gray-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="h-16 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img src={logo} alt="logo" className="w-9 h-9 object-contain" onClick={() => navigate('/')}/>
//             <button className="text-xl font-semibold italic text-gray-900" onClick={() => navigate('/')}>e-cart</button>
//           </div>

//           <nav className="hidden md:flex items-center gap-4">
//             <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:shadow" onClick={() => navigate('/')}>Home</button>
//             <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:shadow" onClick={() => navigate('/collection')}>Collections</button>
//             <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:shadow" onClick={() => navigate('/about')}>About</button>
//             <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:shadow" onClick={() => navigate('/contact')}>Contact</button>
//           </nav>

//           <div className="flex items-center gap-3">
//             <button aria-label="search" className="p-2 bg-white rounded-full shadow-sm" onClick={() => {setShowSearch(s => !s); navigate("/collection")} }>
//               {showSearch ? <IoSearchCircleSharp className="w-5 h-5 text-gray-700" /> : <CiSearch className="w-5 h-5 text-gray-700" />}
//             </button>

//             <div className="relative">
//               {!userData && (
//                 <button className="p-2 bg-white rounded-full shadow-sm" onClick={() => setShowProfile(s => !s)} aria-expanded={showProfile}>
//                   <FaCircleUser className="w-5 h-5 text-gray-800" />
//                 </button>
//               )}
//               {userData && (
//                 <button className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm" onClick={() => setShowProfile(s => !s)}>
//                   {userData?.name?.slice(0, 1).toUpperCase()}
//                 </button>
//               )}

//               {showProfile && (
//                 <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-30">
//                   <ul className="text-sm text-gray-800">
//                     {!userData && <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate('/login'); setShowProfile(false); }}>Login</li>}
//                     {userData && <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { handleLogout(); setShowProfile(false); }}>Logout</li>}
//                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate('/order'); setShowProfile(false); }}>Orders</li>
//                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate('/about'); setShowProfile(false); }}>About</li>
//                   </ul>
//                 </div>
//               )}
//             </div>

//             <button className="hidden md:inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md" onClick={() => navigate('/cart')}>
//               <BsCart2 className="w-5 h-5 text-gray-800"  onClick={() => {getUserCart()}}/>
//               <span className="text-sm">Cart</span>
//               <span className="ml-2 inline-flex items-center justify-center bg-black text-white rounded-full px-2 py-0.5 text-xs">{Number(getCartCount())}</span>
//             </button>

//             <button className="md:hidden p-2 bg-white rounded-full shadow-sm" onClick={() => navigate('/collection')} aria-label="collections">
//               <MdCollections className="w-5 h-5 text-gray-800" />
//             </button>
//           </div>
//         </div>

//         {showSearch && (
//           <div className="py-3">
//             <div className="w-full flex justify-center">
//               <input type="text" placeholder="Search products" className="w-full md:w-1/2 px-4 py-2 rounded-full border border-gray-200 bg-white"  onChange={(e) => {setSearch(e.target.value)}} value={search}/>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="md:hidden">
//         <div className="w-full h-16 bg-gray-900 fixed bottom-0 left-0 flex items-center justify-between px-6 text-xs text-white">
//           <button className="flex flex-col items-center" onClick={() => navigate('/')}>
//             <FaHome className="w-5 h-5" />
//             <span>Home</span>
//           </button>
//           <button className="flex flex-col items-center" onClick={() => navigate('/collection')}>
//             <MdCollections className="w-5 h-5" />
//             <span>Collections</span>
//           </button>
//           <button className="flex flex-col items-center" onClick={() => navigate('/contact')}>
//             <FaPhoneAlt className="w-5 h-5" />
//             <span>Contact</span>
//           </button>
//           <button className="flex flex-col items-center" onClick={() => navigate('/cart')}>
//             <BsCart2 className="w-5 h-5" />
//             <span>Cart</span>
//           </button>
//           <span className="absolute top-2 right-6 bg-white text-black rounded-full px-2 text-xs">{Number(getCartCount())}</span>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Nav



import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { CiSearch } from 'react-icons/ci'
import { FaCircleUser } from 'react-icons/fa6'
import { BsCart2 } from 'react-icons/bs'
import { IoSearchCircleSharp } from 'react-icons/io5'
import { FaHome, FaPhoneAlt } from 'react-icons/fa'
import { MdCollections } from 'react-icons/md'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { shopDataContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Nav = () => {
  const { getCurrentUser, userData } = useContext(userDataContext)
  const {
    showSearch,
    setShowSearch,
    search,
    setSearch,
    getCartCount,
    getUserCart
  } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)

  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(serverUrl + '/api/auth/logout', {}, { withCredentials: true })
      toast.success('Logged out successfully')
      getCurrentUser()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            {/* LOGO */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold tracking-wide text-gray-900">
                e-cart
              </span>
            </div>

            {/* NAV LINKS */}
            <nav className="hidden md:flex items-center gap-8 text-base font-medium text-gray-700">
              <button onClick={() => navigate('/')} className="hover:text-black transition">
                Home
              </button>
              <button onClick={() => navigate('/collection')} className="hover:text-black transition">
                Collections
              </button>
              <button onClick={() => navigate('/about')} className="hover:text-black transition">
                About
              </button>
              <button onClick={() => navigate('/contact')} className="hover:text-black transition">
                Contact
              </button>
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-4">
              {/* SEARCH */}
              <button
                className="p-2 rounded-full border hover:bg-gray-100 transition"
                onClick={() => {
                  setShowSearch(s => !s)
                  navigate('/collection')
                }}
              >
                {showSearch ? (
                  <IoSearchCircleSharp className="w-6 h-6 text-gray-800" />
                ) : (
                  <CiSearch className="w-6 h-6 text-gray-800" />
                )}
              </button>

              {/* PROFILE */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(s => !s)}
                  className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold"
                >
                  {userData ? userData.name?.[0]?.toUpperCase() : <FaCircleUser />}
                </button>

                {showProfile && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border overflow-hidden">
                    <ul className="text-sm font-medium text-gray-800">
                      {!userData && (
                        <li
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            navigate('/login')
                            setShowProfile(false)
                          }}
                        >
                          Login
                        </li>
                      )}
                      {userData && (
                        <li
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleLogout()
                            setShowProfile(false)
                          }}
                        >
                          Logout
                        </li>
                      )}
                      <li
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          navigate('/order')
                          setShowProfile(false)
                        }}
                      >
                        Orders
                      </li>
                      <li
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          navigate('/about')
                          setShowProfile(false)
                        }}
                      >
                        About
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* CART */}
              <button
                className="hidden md:flex items-center gap-3 px-4 py-2 border rounded-xl hover:bg-gray-100 transition"
                onClick={() => {
                  getUserCart()
                  navigate('/cart')
                }}
              >
                <BsCart2 className="w-5 h-5" />
                <span className="font-medium">Cart</span>
                <span className="ml-1 bg-black text-white rounded-full px-2 py-0.5 text-xs">
                  {Number(getCartCount())}
                </span>
              </button>
            </div>
          </div>

          {/* SEARCH BAR */}
          {showSearch && (
            <div className="pb-5">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full md:w-1/2 mx-auto block px-5 py-3 rounded-full border bg-gray-50 focus:bg-white focus:border-gray-900 outline-none text-base"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          )}
        </div>
      </header>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900">
        <div className="h-16 flex items-center justify-between px-8 text-white">
          <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1">
            <FaHome className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>

          <button onClick={() => navigate('/collection')} className="flex flex-col items-center gap-1">
            <MdCollections className="w-5 h-5" />
            <span className="text-xs">Shop</span>
          </button>

          <button onClick={() => navigate('/contact')} className="flex flex-col items-center gap-1">
            <FaPhoneAlt className="w-5 h-5" />
            <span className="text-xs">Contact</span>
          </button>

          <button onClick={() => navigate('/cart')} className="relative flex flex-col items-center gap-1">
            <BsCart2 className="w-5 h-5" />
            <span className="text-xs">Cart</span>
            <span className="absolute -top-2 -right-3 bg-white text-black rounded-full px-2 text-xs">
              {Number(getCartCount())}
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Nav
