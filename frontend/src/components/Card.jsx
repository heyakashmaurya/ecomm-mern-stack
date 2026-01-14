import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { Link, useNavigate } from 'react-router-dom'

const Card = ({ name, id, image, price }) => {
  const { currency } = useContext(shopDataContext)
  let navigate =useNavigate();

  return (
    <article  className='group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-200 hover:-translate-y-1'>
      <div className='relative w-full h-52 sm:h-56 md:h-48 lg:h-52 bg-gray-100' >
        <Link to={`/productdetails/${id}`}><img src={image} alt={name} onClick={()=> navigate(`/productdetails/${id}`)} className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' /> </Link>

        <div className='absolute top-3 left-3 bg-white/90 text-xs text-gray-800 px-2 py-1 rounded-md font-medium'>New</div>

        <div className='absolute top-3 right-3 bg-indigo-600 text-white text-sm px-2 py-1 rounded-md font-semibold'>
          {currency} {price}
        </div>

        <div className='absolute inset-0 flex items-end justify-center p-3 pointer-events-none'>
          <div className='w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto flex gap-2 justify-center'>
            <Link to={`/productdetails/${id}`} className='bg-white text-sm text-gray-800 px-3 py-1 rounded-md shadow-sm'>View</Link>
            <button className='bg-indigo-600 text-white text-sm px-3 py-1 rounded-md shadow-sm'>Add</button>
          </div>
        </div>
      </div>

      <div className='p-3 border-t'>
        <Link to={`/productdetails/${id}`} className='block'>
          <h3 className='text-sm font-semibold text-gray-900 leading-tight truncate'>{name}</h3>
          <p className='text-xs text-gray-500 mt-1 line-clamp-2'>Comfortable, stylish and crafted for everyday wear.</p>
        </Link>
      </div>
    </article>
  )
}

export default Card
