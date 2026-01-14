// import React, { useContext, useEffect, useState } from 'react'
// import Title from '../components/Title'
// import { shopDataContext } from '../context/ShopContext'
// import { authDataContext } from '../context/AuthContext'
// import axios from 'axios'

// function Order() {
//   let [orderData, setOrderData] = useState([])
//   let {currency} = useContext(shopDataContext)
//   let {serverUrl} = useContext(authDataContext)

//   const loadOrderData = async () => {
//     try {
//       const result = await axios.post(serverUrl + "/api/order/userorders" ,{},  {withCredentials:true})
//       if (result.data){
//         let allOrdersItem = []
//         result.data.map((order) => {
//           order.items.map((item) => {
//             item["status"] = order.status
//             item["payment"]= order.payment
//             item["paymentMethod"]= order.paymentMethod
//             item["date"] = order.date
//             allOrdersItem.push(item)
//           })
//         })
//         console.log(result.data)
//         setOrderData(allOrdersItem.reverse())

//       }
//     } catch (error) {
//       console.log(error)
//     }

//   }
//   useEffect(()=> {
//     loadOrderData()
//   },[])
//   return (
//     <div className='max-w-7xl min-h-screen px-4 py-8 overflow-hidden bg-red-50 mx-auto'>
//       <div className=' h-[8%] w-[100%] mt-[80px] text-center  '>
//           <Title title1='My' title2='Orders'/>
//          </div>
//          <div className='w-[100%] h-[90%] flex flex-wrap gap-[20px] '>
//             {
//               orderData.map((item, index) => {
//                 return (<div key={index} className=' w-[100%] h-[100%] border-t border-b '>
//                   <div className='w-[100%] h-[10%] flex items-start gap-6 py-[10px] px-[20px] rounded-2xl relative '>
//                       <img src={item.image1} alt=""  className='w-[130px] h-[130px] rounded-md '/>
//                       <div className='flex items-start justify-center flex-col gap-[5px] '>
//                         <p className='md:text-[25px] text-20px '>{item.name}</p> 
//                         <div className='flex items-center gap-[8px] md:gap-[20px] '>
//                           <p className='md:text-[18px] text-[12px]  '> Price :{currency} {item.price} </p>
//                           <p className='md:text-[18px] text-[12px]  '> Quantity : {item.quantity} </p>
//                           <p className='md:text-[18px] text-[12px]  '> size : {item.size} </p>
//                         </div>
//                         <div className='flex items center  '>
//                           <p className='md:text-[18px] text-[12px]  '> Date: <span className='pl-2.5 md:text-[16px] text-[11px]  '>
//                             {new Date(item.date).toDateString()}
//                             </span> </p>
//                         </div>
//                         <div className='flex items center  '>
//                           <p className='md:text-[18px] text-[12px]  '> Payment Method: {item.paymentMethod} </p>
//                         </div>
//                         <div className='absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%]  '>
//                           <div className='flex items-center gap-[5px]  '>
//                             <p className='min-w-2 h-2 rounded-full bg-green-500  '> </p>
//                             <p className='md:text-[17px] text-[10px]  '>{item.status} </p>
//                           </div>
//                         </div>

//                         <div className='absolute md:right-[5%] right-[1%] md:top-[40%] top-[70%]  '>
//                           <button className='md:px-[15px] md:py-[7px] px-[5px] py-[3px] rounded-md md:text-[16px] cursor-pointer active:bg-amber-300 bg-[#101919] text-[#ffffff] ' onClick={ loadOrderData}> Track Order</button>
//                         </div>
//                       </div>
//                   </div>
//                 </div>)
//               })
//             }
//          </div>
//     </div>
//   )
// }

// export default Order



import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {
  const [orderData, setOrderData] = useState([])
  const { currency } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    try {
      const result = await axios.post(
        serverUrl + '/api/order/userorders',
        {},
        { withCredentials: true }
      )

      if (result.data) {
        let allOrdersItem = []
        result.data.forEach(order => {
          order.items.forEach(item => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            })
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [])

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 mt-10">
          <Title title1="My" title2="Orders" />
          <p className="mt-3 text-gray-500 text-sm md:text-base">
            Track and manage your recent purchases
          </p>
        </div>

        {/* Orders */}
        <div className="space-y-6">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row gap-6 p-6">
                {/* Product Image */}
                <img
                  src={item.image1}
                  alt={item.name}
                  className="w-full md:w-32 h-32 object-cover rounded-xl border"
                />

                {/* Order Details */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
                    <p>Price: <span className="font-medium">{currency}{item.price}</span></p>
                    <p>Qty: <span className="font-medium">{item.quantity}</span></p>
                    <p>Size: <span className="font-medium">{item.size}</span></p>
                  </div>

                  <div className="text-sm text-gray-600">
                    Ordered on:{' '}
                    <span className="font-medium">
                      {new Date(item.date).toDateString()}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600">
                    Payment: <span className="font-medium">{item.paymentMethod}</span>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex md:flex-col items-start md:items-end justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.status === 'Delivered'
                          ? 'bg-green-500'
                          : item.status === 'Cancelled'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                      }`}
                    />
                    <p className="text-sm font-medium text-gray-700">
                      {item.status}
                    </p>
                  </div>

                  <button
                    onClick={loadOrderData}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 active:scale-95 transition"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}

          {orderData.length === 0 && (
            <div className="text-center text-gray-500 py-20">
              You have not placed any orders yet.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Order
