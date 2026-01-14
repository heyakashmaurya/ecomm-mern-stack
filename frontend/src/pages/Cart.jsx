import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin5Fill } from "react-icons/ri";
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify'; 

const Cart = () => {
  const {products, currency, cartItem, updateQuantity} = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const tempData = []
      for (const items in cartItem){
        for(const size in cartItem[items]){
          if(cartItem[items][size] > 0){
            tempData.push({
              _id: items,
              size: size,
              quantity: cartItem[items][size],
            })
          }
        }
      }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className='max-w-7xl mx-auto px-4 min-h-screen p-5 overflow-hidden flex flex-col'>
  <div className='h-[8%] w-full mt-8 '>
    <Title title1='Your' title2='Carts'/>
  </div>
  
  <div className='w-full h-[92%] overflow-y-auto bg-amber-50'>
    {/* Cart Items */}
    {cartData.map((item, index) => {
      const productData = products.find((product) => product._id === item._id);
      return (
        /* Changed w-screen to w-full below */
        <div key={index} className='w-full border-t border-b'> 
          <div className='w-full flex items-start gap-6 py-2.5 px-5 rounded-2xl relative'>
            <img 
              src={productData.image1} 
              alt={productData.name} 
              className='w-[100px] h-[100px] object-cover rounded-lg cursor-pointer' 
              onClick={() => {navigate(`/productdetails/${productData._id}`)}}
            />
            <div className='flex items-start justify-center flex-col gap-2.5 '>
            <p className='md:text-[25px] text-[10px] '>{productData.name}</p>
            <div className=' flex items-center gap-5 '>
              <p className='md:text-[20px] text-[10px] border border-amber-950 rounded px-2 mb-1 '>Size: {item.size}</p>
              <p className='md:text-[20px] text-[10px] text-emerald-500 '>Price: {currency}{productData.price}</p>
            </div>
          </div>

          <input type="number" min={1} defaultValue={item.quantity} className='md:max-w-20 max-w-10 md:px-2 md:py-2 py-[5px] px-[10px] text-[18px] font-semibold absolute md:top-[40%] top-[45%] left-[75%] md:left-[50%] border rounded-md  ' onChange={(e) => {e.target.value === "" || e.target.value === "0" ? null : updateQuantity(item._id, item.size, Number(e.target.value))}}/>


          <RiDeleteBin5Fill  className='w-6 h-6 absolute top-[50%] md:top-[40%] md:right-[5%] right-1 ' onClick={() => {
            updateQuantity(item._id, item.size, 0)
          }}/>

          </div>
        </div>
      )
    })}
  </div>

  <div className=' flex flex-col  justify-start items-end my-5 px-5j '>
    <div className='w-full sm:w-[450px] '><CartTotal/></div>
    <button className='text-[18px] hover:bg-amber-500 cursor-pointer py-2.5 px-[50px] rounded-2xl border ml-[30px] mt-[20px] '
     onClick={() => {if(cartData.length > 0){navigate("/placeorder")}else{console.log("Your Cart is Empty"); toast.error("Your Cart is Empty")}   }}>Checkout</button>
  </div>
</div>
  )
}

export default Cart


