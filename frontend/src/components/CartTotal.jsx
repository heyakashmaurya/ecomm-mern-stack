// import React, { useContext } from 'react'
// import { shopDataContext } from '../context/ShopContext'
// import Title from './Title'

// function CartTotal() {
//     const{currency, delivery_fee , getCartAmount} = useContext(shopDataContext)
//   return (
//     <div className='w-full lg:ml-[30px] '>
//       <div className=' text-xl py-[10px]'>
//         <Title title1='Cart' title2='Total'/> 
//       </div>
//       <div className='flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px]  '>
//         <div className='flex justify-between text-[18px] font-semibold'>
//           <p>Subtotal</p>
//           <p>{currency}{getCartAmount()}.00</p>
//         </div>
//         <hr />
//         <div className='flex justify-between text-[18px] font-semibol'>
//           <p>Delivery Fee</p>
//           <p>{currency}{delivery_fee}</p>
//         </div>
//         <div className='flex justify-between text-[18px] font-semibol'>
//           <p>Total</p>
//           <p>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee }</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartTotal


import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } =
    useContext(shopDataContext)

  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Title */}
      <div className="mb-6">
        <Title title1="Cart" title2="Total" />
      </div>

      {/* Card */}
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        
        {/* Subtotal */}
        <div className="flex items-center justify-between py-3 text-lg font-medium">
          <span className="text-gray-700">Subtotal</span>
          <span className="text-gray-900 whitespace-nowrap">
            {currency}{subtotal}.00
          </span>
        </div>

        <div className="border-t border-gray-200" />

        {/* Delivery */}
        <div className="flex items-center justify-between py-3 text-lg font-medium">
          <span className="text-gray-700">Delivery Fee</span>
          <span className="text-gray-900 whitespace-nowrap">
            {currency}{delivery_fee}
          </span>
        </div>

        <div className="border-t border-gray-300 my-2" />

        {/* Total */}
        <div className="flex items-center justify-between py-4 text-2xl font-bold">
          <span className="text-gray-900">Total</span>
          <span className="text-green-600 whitespace-nowrap">
            {currency}{total}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartTotal

