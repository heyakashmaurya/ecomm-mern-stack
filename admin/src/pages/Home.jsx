import React from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { useEffect } from 'react';

const Home = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const {serverUrl} = useContext(authDataContext)

  const fetchCounts = async() => {
    try {
     let product = await axios.get(serverUrl + "/api/product/list" , {}, {withCredentials:true});
     setTotalProducts(product.data.length);

     let order = await axios.post(serverUrl + "/api/order/list" , {}, {withCredentials:true});
     setTotalOrders(order.data.length);
    } catch (error) {
      console.error("failed to fetch counts", error);
    }
  }

  useEffect(() => {
    fetchCounts();

  }, [fetchCounts])

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#32393b] to-[#2d1818] text-white relative '>
      <Nav/>
      <Sidebar/>
      <div className=' w-[70vw] h-[100vh] absolute left-[25%] flex items-start justify-start flex-col gap-[40px] py-[100px]  '>
       <h1 className='text-[35px] font-bold'>Dashboard</h1>
       <div className='flex gap-4 mt-4'>
          <div className='bg-gray-800 p-4 rounded-lg'>
            <h2 className='text-xl font-semibold'>Total Products</h2>
            <p className='text-2xl'>{totalProducts}</p>
          </div>
          <div className='bg-gray-800 p-4 rounded-lg'>
            <h2 className='text-xl font-semibold'>Total Orders</h2>
            <p className='text-2xl'>{totalOrders}</p>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default Home