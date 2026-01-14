// import React, { useContext, useState } from 'react'
// import Title from '../components/Title'
// import CartTotal from '../components/CartTotal'
// import razorpay from '../assets/razor.jpg'
// import { shopDataContext } from '../context/ShopContext';
// import { authDataContext } from '../context/AuthContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';



// function PlaceOrder() {
//   let [method , SetMethod] = useState("cod");
//   let [loading, setLoading] = useState(false)
//   let navigate = useNavigate()
//   const {products,cartItem, setCartItem, getCartItem,getCartAmount, delivery_fee } = useContext(shopDataContext)
//   let {serverUrl} = useContext(authDataContext)
//   const [formData, setFormData] = useState({
//     firstName: "", 
//     lastName:"", 
//     email: '', 
//     street:"", 
//     city:"", 
//     state:"", 
//     pinCode:"", 
//     country:"", 
//     phone:"", 

//   })

//   const onChangeHandler = (e) => {
//     e.preventDefault()
//      setFormData(data => ({...data, [e.target.name]:e.target.value}))
//   }



//  const initPayment = (data) => {
//   const options = {
//     key: import.meta.env.VITE_RAZORPAY_KEY_ID, // REQUIRED
//     amount: data.amount,
//     currency: data.currency,
//     order_id: data.razorpayOrderId, // FIXED
//     name: "Payment for Order",
//     description: "Test Transaction",

//     handler: async function (response) {
//       console.log("PAYMENT SUCCESS (TEST):", response);
//       const res = await axios.post(serverUrl+ "/api/order/verifyrazorpay", 
//         {
//           razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature
//           } , 
//           {withCredentials:true})
//       if(res.data){
//         navigate("/order")
//         setCartItem({})
//       }
      
//     },

//     theme: {
//       color: "#8ACDDD"
//     }
//   };

//   const rzp = new window.Razorpay(options);
//   rzp.open();
// };



//   const onSubmitHandler = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     let orderItem = [];

//     // 1️⃣ Build order items
//     for (const items in cartItem) {
//       for (const size in cartItem[items]) {
//         if (cartItem[items][size] > 0) {
//           const itemInfo = structuredClone(
//             products.find(product => product._id === items)
//           );

//           if (itemInfo) {
//             itemInfo.size = size;
//             itemInfo.quantity = cartItem[items][size];
//             orderItem.push(itemInfo);
//           }
//         }
//       }
//     }

//     // 2️⃣ Create order data ONCE
//     const orderData = {
//       address: formData,
//       items: orderItem,
//       amount: getCartAmount() + delivery_fee
//     };

//     // 3️⃣ Place order ONCE
//     switch (method) {
//       case "cod": {
//         setLoading(true)
//         const result = await axios.post(
//           serverUrl + "/api/order/placeorder",
//           orderData,
//           { withCredentials: true }
//         );
//         toast.success("Order placed successfully")
//         if(result.data){
//           navigate("/order")
//           setCartItem({})
//           setLoading(false)

//         }else{
//           console.log(result.data.message)
//         }
//         console.log(result.data);
//         break;

        
//       }

//       case "razorpay": {
//         setLoading(true)
//         const result = await axios.post(
//           serverUrl + "/api/order/razorpay",
//           orderData,
//           { withCredentials: true }
//         )
//         toast.success("Order placed successfully")


//         if(result.data){
//           initPayment(result.data)
//           setLoading(false)

//         }
//       }

//       break;

//       default:
//         break;
//     }

//   } catch (error) {
//     console.log(error);
//   }finally{
//     setLoading(false)
//   }
// };

//   return (
//     <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-10 md:items-start justify-center md:pt-20 relative'>
//       <div  className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px] '>
//         <form action="" onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%] '>
//           <div className='py-[10px] '>
//             <Title title1='Delivery ' title2='Information'/>
//           </div>

//           <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]  '>
//             <input type="text" placeholder='First name' onChange={onChangeHandler} name='firstName' value={formData.firstName} className='w-[48%] h-[50%] rounded-md shadow-sm placeholder:text-gray text-[18px] px-[20px]' required />
//             <input type="text" placeholder='Last name' name='lastName' onChange={onChangeHandler} value={formData.lastName} className='w-[48%] h-[50%] rounded-md shadow-sm placeholder:text-gray text-[18px] px-[20px] ' required />
//           </div>
//           <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]  '>
//             <input type="email" placeholder='Email' name='email' onChange={onChangeHandler}value={formData.email} className='w-[100%] h-[50%] rounded-md shadow-sm placeholder:text-gray text-[18px] px-[20px]  ' required />
//           </div>
//           <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]  '>
//             <input type="text" placeholder='street' name='street' onChange={onChangeHandler} value={formData.street} className='w-[100%] h-[50%] rounded-md shadow-sm placeholder:text-gray text-[18px] px-[20px]  ' required />
//           </div>
//           <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]  '>
//             <input type="text" placeholder='City' name='city' onChange={onChangeHandler} value={formData.city} className='w-[48%] h-[50%] rounded-md shadow-sm placeholder:text-gray text-[18px] px-[20px]  ' required />
//             <input type="text" placeholder='State' name='state' onChange={onChangeHandler} value={formData.state} className='w-[48%] h-[50%] rounded-md shadow-sm placeholder:text-gray text-[18px] px-[20px]  ' required />
//           </div>
//           <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]  '>
//             <input type="text" placeholder='Pincode' name='pinCode' onChange={onChangeHandler} value={formData.pinCode} className='w-[48%] h-[50%] rounded-md shadow-sm placeholder:text-gray text-[18px] px-[20px]  ' required />
//             <input type="text" placeholder='Country' name='country' onChange={onChangeHandler} value={formData.country} className='w-[48%] h-[50%] rounded-md shadow-sm placeholder:text-gray text-[18px] px-[20px]  ' required />
//           </div>
//           <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]  '>
//             <input type="text" placeholder='Phone' name='phone' onChange={onChangeHandler} value={formData.phone} className='w-[100%] h-[50%] rounded-md shadow-sm placeholder:text-gray text-[18px] px-[20px]  ' required />
//           </div>

//           <div>
//             <button type='submit' className='text-[18px] bg-[#3bcee848] hover:bg-emerald-400 active:bg-amber-200 cursor-pointer py-2.5 px-[50px] rounded-2xl border ml-[30px] mt-[20px] flex items-center justify-center gap-[20px] absolute lg:right-[20%] lg:bottom-[-15px] bottom-[5%] right-[28%]  '
//               >{loading ? "Processing..." : "Place Order"}</button>
//           </div>
//         </form>

        

//       </div>
//       <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px] '>
//           <div className='lg:w-[70%] w-[90%] lg-h-[70%] flex items-center justify-center gap-[10px] flex-col '>
//             <CartTotal/>
//             <div className='py-[10px] '>
//             <Title title1='Payment ' title2='Method'/>
//           </div>
//           <div className='w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px]  '>

//             <button onClick={()=> SetMethod("razorpay")} className={`w-[150px] h-[50px] rounded-sm  ${method === "razorpay" ? "border-[5px] border-blue-700 rounded-sm " : ""} `}> <img src={razorpay} alt='' className='w-[100%] h-[100%] object-cover rounded-sm ' /> </button>
//             <button onClick={()=> SetMethod("cod")} className={`w-[200px] h-[50px] rounded-sm  bg-gradient-to-t from-[#95b3f8] to-[white]  ${method === "cod" ? "border-[5px] border-blue-700 rounded-sm  " : ""} `}> CASH ON DELIVERY </button>
//           </div>
//           </div>
//         </div>

//     </div>
//   )
// }

// export default PlaceOrder


import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import razorpay from '../assets/razor.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function PlaceOrder() {
  const [method, setMethod] = useState('cod')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { products, cartItem, setCartItem, getCartAmount, delivery_fee } =
    useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  /* -------- INPUT STYLE (BIG + CLEAN) -------- */
  const inputClass =
    'w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-base text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:ring-2 focus:ring-gray-200 outline-none transition'

  /* -------- RAZORPAY -------- */
  const initPayment = data => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.razorpayOrderId,
      name: 'Order Payment',
      description: 'Secure Payment',

      handler: async response => {
        const res = await axios.post(
          serverUrl + '/api/order/verifyrazorpay',
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          },
          { withCredentials: true }
        )
        if (res.data) {
          setCartItem({})
          navigate('/order')
        }
      },
      theme: { color: '#111827' }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  /* -------- PLACE ORDER -------- */
  const onSubmitHandler = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      let orderItem = []

      for (const items in cartItem) {
        for (const size in cartItem[items]) {
          if (cartItem[items][size] > 0) {
            const itemInfo = structuredClone(
              products.find(p => p._id === items)
            )
            itemInfo.size = size
            itemInfo.quantity = cartItem[items][size]
            orderItem.push(itemInfo)
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItem,
        amount: getCartAmount() + delivery_fee
      }

      if (method === 'cod') {
        const res = await axios.post(
          serverUrl + '/api/order/placeorder',
          orderData,
          { withCredentials: true }
        )
        toast.success('Order placed successfully')
        if (res.data) {
          setCartItem({})
          navigate('/order')
        }
      }

      if (method === 'razorpay') {
        const res = await axios.post(
          serverUrl + '/api/order/razorpay',
          orderData,
          { withCredentials: true }
        )
        toast.success('Order created')
        if (res.data) initPayment(res.data)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-[90%] bg-gray-100 py-20 mt-8">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* -------- DELIVERY INFO -------- */}
        <div className="bg-white rounded-3xl p-8 shadow-md border">
          <Title title1="Delivery" title2="Information" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <input className={inputClass} name="firstName" placeholder="First Name" onChange={onChangeHandler} required />
            <input className={inputClass} name="lastName" placeholder="Last Name" onChange={onChangeHandler} required />

            <input className={`${inputClass} md:col-span-2`} name="email" placeholder="Email Address" onChange={onChangeHandler} required />
            <input className={`${inputClass} md:col-span-2`} name="street" placeholder="Street Address" onChange={onChangeHandler} required />

            <input className={inputClass} name="city" placeholder="City" onChange={onChangeHandler} required />
            <input className={inputClass} name="state" placeholder="State" onChange={onChangeHandler} required />

            <input className={inputClass} name="pinCode" placeholder="Pincode" onChange={onChangeHandler} required />
            <input className={inputClass} name="country" placeholder="Country" onChange={onChangeHandler} required />

            <input className={`${inputClass} md:col-span-2`} name="phone" placeholder="Phone Number" onChange={onChangeHandler} required />
          </div>
        </div>

        {/* -------- SUMMARY + PAYMENT -------- */}
        <div className="space-y-8">
          {/* CART TOTAL */}
          <div className="bg-white rounded-3xl p-8 shadow-md border overflow-hidden">
            <CartTotal />
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-white rounded-3xl p-8 shadow-md border">
            <Title title1="Payment" title2="Method" />

            <div className="flex flex-col gap-5 mt-8">
              <button
                type="button"
                onClick={() => setMethod('razorpay')}
                className={`flex items-center gap-4 p-5 rounded-2xl border text-lg font-medium transition
                  ${method === 'razorpay'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-500'}`}
              >
                <img src={razorpay} alt="Razorpay" className="h-9" />
                Pay with Razorpay
              </button>

              <button
                type="button"
                onClick={() => setMethod('cod')}
                className={`p-5 rounded-2xl border text-lg font-medium text-left transition
                  ${method === 'cod'
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-300 hover:border-gray-500'}`}
              >
                Cash on Delivery
              </button>
            </div>
          </div>

          {/* PLACE ORDER BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-gray-900 text-white text-xl font-bold hover:bg-gray-800 active:scale-95 transition disabled:opacity-60"
          >
            {loading ? 'Processing Order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default PlaceOrder
