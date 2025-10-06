import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Background from '../components/Background'
import Product from './Product'


const Home = () => {
  let heroData = [
    {text1: "30% OFF Limited Offer", text2: "Style that"},
    {text1: "Discover the Best of Bold Fashion ", text2: "Limited Time only !"},
    {text1: "Explore Our Best Collections", text2: "Shop Now!"},
    {text1: "Choose Your Perfect Fashion Fit", text2: "Now on Sale"},
  ]
  const [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 :prevCount + 1))
    },3000)
    return ()=> clearInterval(interval)
  },[] )
  
  return (
    <div className=' overflow-x-hidden relative top-[70px] mb-[50px]  '>
    <div className='w-[100vw] lg:h-[70vh] md:h-[50vh] h-[35vh] bg-gradient-to-r from-slate-800 via-gray-900 to-black flex items-center justify-center '>
      <Hero heroCount = {heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]}/> 
      <Background heroCount = {heroCount} />
      
    </div>
    <Product/>
    </div>
  )
}

export default Home


