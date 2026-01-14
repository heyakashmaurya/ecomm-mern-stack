import React from 'react'
import Nav from "../components/Nav"
import SideBar from '../components/Sidebar'
import { useState,useEffect,useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { LuShoppingBag } from "react-icons/lu";
import { toast } from 'react-toastify'

const Orders = () => {
  let [orders, setOrders] = useState([])
let {serverUrl} = useContext(authDataContext)

const fetchAllOrders = async() => {
  try {
    const result = await axios.post(serverUrl + "/api/order/list", {} , {withCredentials:true})
    setOrders(result.data.reverse())
    console.log(result.data)
  } catch (error) {
    console.log(error)
  }
}

const statusHandler = async(orderId , status) => {
  try {
    let result = await axios.post(serverUrl + "/api/order/updateorderstatus", {orderId, status} , {withCredentials:true})
    console.log(result.data)
    if(result.data){
      await fetchAllOrders()
    }
    toast.success("Order status updated successfully")
  } catch (error) {
    console.log(error)
    toast.error("Error updating order status", error.message)
  }
}

useEffect(() => {
  fetchAllOrders()
},[])

  return (
    <>
      <Nav className="w-[100%]" />
    <div className='max-w-7xl mx-auto px-4 min-h-[100vh] p-5 overflow-hidden flex flex-col  py-5'>
      <div className='w-[100%] min-h-[100%] flex items-center lg:justify-start justify-center '>
      <SideBar/>
      <div className='lg:w-[85%] md:w-[70%] h-[100%] lg:ml-[310px] md:ml-[250px]  flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px] '>
        <div className='w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px] '> All Orders List</div>

        {
          orders.map((order, index) => {
            return (
              <div key={index} className='w-[90%] h-[40%] flex lg:items-center items-start justify-between flex-col lg:flex-row p-[10px] md:px-[20px] gap-[20px] bg-rose-100 rounded-lg '>
                <LuShoppingBag className='w-[60px] h-[60px] text-black p-[5px] rounded-lg bg-white ' />
                <div className='flex items-start justify-center flex-col gap-[5px] text-[16px] text-[#56dbfc]  '>
                  {
                    order.items.map((item, idx) => {
                      if(idx === order.items.length - 1){
                        return <p key={idx}>{item.name.toUpperCase()}  *  {item.quantity}  <span>{item.size} </span> </p>
                      }else{
                        return <p key={idx}>{item.name.toUpperCase()}  *  {item.quantity}  <span>{item.size} </span> , </p>
                      }
                    })
                  }
                  <div className='text-[14px] text-[#56dbfc] '>
                  <p>{order.address.firstName+ " " + order.address.lastName}</p>
                  <p>{order.address.street + "," + order.address.city + "," + order.address.state + "," + order.address.pinCode} </p>
                  <p>{order.address.phone} </p>

                </div>
                </div>
                <div className='text-[15px]   '>
                  <p>Items:{order.items.length} </p>
                  {/* <p>Total Amount: ${order.amount} </p> */}
                  <p>Payment Method: ${order.paymentMethod} </p>
                  <p>Status: {order.payment ? "Paid" : "Pending"} </p>
                  <p>Date: {new Date(order.date).toLocaleDateString()} </p>
                  <p className='text-[20px] text-[green] '> Rs. {order.amount} </p>
                </div>

                <select name="status" value={order.status} onChange={(e) => statusHandler(order._id, e.target.value)} id="">
                  <option value="Order placed">Order Placed</option>
                  <option value="Preparing">Preparing</option>
                  <option value="On the Way">On the Way</option>
                  <option value="Out of Delivery">Out of Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>

              </div>
            )
          })
        }

      </div>
      </div>

    </div>
    </>
  )
}

export default Orders