import React from 'react'
import { FaCircle } from "react-icons/fa";

const Hero = ({heroData, heroCount, setHeroCount}) => {
  return (
    <div className='bg-red-700 w-[40%]  h-[100%] relative'>
        <div className=' absolute text-[#88d9ee] text-[24px] md:text-[35px] lg:text-[55px] md:left-[10%] md:top-[50px] lg:top-[90px]  left-[7%] top-[50px]'>
            <p>{heroData.text1}</p>
            <p>{heroData.text2}</p>
        </div>

        <div className='flex items-center justify-start gap-[10px] ml-[15%] mb-[30px] absolute bottom-0 font-bold'>
            <FaCircle className={`md:w-[14px] w-[8px] ${heroCount === 0 ? "fill-orange-400": "fill-white"} cursor-pointer`} onClick={() => setHeroCount(0)}/>
            <FaCircle className={`md:w-[14px] w-[8px] ${heroCount === 1 ? "fill-orange-400": "fill-white"} cursor-pointer`} onClick={() => setHeroCount(1)}/>
            <FaCircle className={`md:w-[14px] w-[8px] ${heroCount === 2 ? "fill-orange-400": "fill-white"} cursor-pointer`} onClick={() => setHeroCount(2)} />
            <FaCircle className={`md:w-[14px] w-[8px] ${heroCount === 3 ? "fill-orange-400": "fill-white"} cursor-pointer`} onClick={() => setHeroCount(3)} />
        </div>
    </div>
  )
}

export default Hero