import React from 'react'

const Title = ({title1, title2}) => {
  return (
        <div className=' flex items-center justify-center bg-fuchsia-100 mt-2 shadow-2xl '>
          <h1 className='md:text-[54px] text-[24px] text-[#1767ef]  font-extrabold  '>{title1}</h1>  <span className='md:text-[54px] text-[24px] text-[#f23800] font-extrabold ml-3 '>{title2}</span>
        </div>
  )
}

export default Title