// import React from 'react'
// import Nav from "../components/Nav"
// import Sidebar from "../components/Sidebar"
// import { useState } from 'react'
// import { useContext } from 'react'
// import { authDataContext } from '../context/AuthContext'
// import axios from 'axios'
// import { useEffect } from 'react'

// const Lists = () => {
//   const [list, setList] = useState([])
//   let {serverUrl} = useContext(authDataContext)

//   const fetchList = async() => {
//     try {
//       let result = await axios.get(serverUrl + "/api/product/list" )
//       setList(result.data)
//       console.log(result.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const removeList =  async(id) => {

//     try {
//       let result = await axios.post(`${serverUrl}/api/product/remove/${id}`,{}, {withCredentials:true})
//       console.log(result.data)

//       if(result.data){
//         fetchList()
//       }
//       else{
//         console.log("Failed to Remove Product")
//       }
//     } catch(error){
//       console.log(error)
//     }
//   }
  
//   useEffect(() => {
//     fetchList()
//   }, [])
  

//   return (
//     <div className='w-[100vw] min-h-[100vh] bg-[#3d3c3c] text-white '>
//       <Nav/>
//       <div className='w-[100%] h-[100%] flex items-center justify-start  '>
//         <Sidebar/>

//         <div className='w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px] '>
//           <div className='w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px] text-white  '>All List Product</div>
          
//           {
//             list?.length > 0 ? (
//               list.map((item ,idx) => (
//                 <div className='w-[90%] md:h-[120px] h-[90px] bg-slate-800 rounded-xl flex items-center justify-start gap-[5px] md:gap-[30px] p-[10px]  md:px-[30px] ' key={idx}>
//                   <img src={item.image1} className='w-[30%] md:w-[120px] h-[90px] rounded-lg ' alt="image" />

//                   <div className='w-[90%] h-[80%] flex flex-col items-start justify-center gap-[2px] '>
                    
//                     <div className='w-[100%] md:text-[20px] text-[15px] text-white  '>{item.name} </div>
//                     <div className=' md:text-[17px] text-[15px] text-[rgb(76,198,228)]  '>{item.category} </div>
//                     <div className=' md:text-[17px] text-[15px] text-[#00ff26]  '>₹{item.price} </div>

//                   </div> 

//                   <div className='w-[10%] h-[100%] bg-transparent flex items-center justify-center '>
//                     <span className='w-[35%] h-[40%] flex items-center justify-center rounded-md md:hover:bg-red-400 md:hover:text-black cursor-pointer hover:text-red-400 p-[20px] ' onClick={() => removeList(item._id)}>X</span>
//                   </div>
//                 </div>
//               )
//               )
//             )  
//             : ( <div className='text-white text-lg'> No product Available</div> )
//           }

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Lists


import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

const Lists = () => {
  const [list, setList] = useState([]);
  const { serverUrl } = useContext(authDataContext);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/product/list`);
      setList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeList = async (id) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.data) fetchList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#2e2e2e] text-white overflow-x-hidden">
      <Nav />
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="ml-[20vw] pt-[90px] px-6 md:px-10 pb-10">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-semibold">
            All Listed Products
          </h1>
          <p className="text-gray-400 mt-1">
            Manage and remove products from your store
          </p>
        </div>

        {/* Product List */}
        {list.length > 0 ? (
          <div className="flex flex-col gap-6">
            {list.map((item) => (
              <div
                key={item._id}
                className="bg-slate-800 rounded-2xl p-4 md:p-6 flex items-center gap-4 md:gap-6 hover:bg-slate-700 transition"
              >
                {/* Image */}
                <img
                  src={item.image1}
                  alt={item.name}
                  className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-xl object-cover flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg md:text-xl font-medium truncate">
                    {item.name}
                  </h2>
                  <p className="text-sm md:text-base text-cyan-400">
                    {item.category}
                  </p>
                  <p className="text-sm md:text-base text-green-400 font-semibold">
                    ₹{item.price}
                  </p>
                </div>

                {/* Action */}
                <button
                  onClick={() => removeList(item._id)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center
                  text-red-400 hover:bg-red-500 hover:text-black transition text-lg font-bold"
                  title="Remove product"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-lg text-gray-300">
            No products available
          </div>
        )}
      </div>
    </div>
  );
};

export default Lists;
