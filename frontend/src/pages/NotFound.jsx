import React from 'react'
import { useNavigate } from 'react-router-dom';

function NotFound() {
    let navigate = useNavigate();
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-white'>
      <h1 className='text-9xl font-bold text-gray-800'>404</h1>
      <p className='text-2xl text-gray-600 mt-4'>Page Not Found</p>

      <button onClick={() => navigate('/')} className='mt-8 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300'>
        Go Back Home
      </button>
    </div>
  )
}

export default NotFound
