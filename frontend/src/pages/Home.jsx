import React, { useEffect, useState, useContext, useRef } from 'react'
import Hero from '../components/Hero'
import Background from '../components/Background'
import Product from './Product'
import { shopDataContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import CollectionCard from '../components/CollectionCard'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'


const Home = () => {
  let heroData = [
    {text1: "30% OFF Limited Offer", text2: "Style that"},
    {text1: "Discover the Best of Bold Fashion ", text2: "Limited Time only !"},
    {text1: "Explore Our Best Collections", text2: "Shop Now!"},
    {text1: "Choose Your Perfect Fashion Fit", text2: "Now on Sale"},
  ]
  const [heroCount, setHeroCount] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)
  const heroLen = heroData.length
  const { products } = useContext(shopDataContext)

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setHeroCount(prev => (prev + 1) % heroLen)
      }, 3500)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPaused, heroLen])

  const goNext = () => setHeroCount(prev => (prev + 1) % heroLen)
  const goPrev = () => setHeroCount(prev => (prev - 1 + heroLen) % heroLen)
  const goTo = idx => setHeroCount(idx)

  return (
    <div className=' overflow-x-hidden relative top-[70px] mb-[50px] '>
      <div
        className='w-screen lg:h-[70vh] md:h-[55vh] h-[50vh] relative bg-gradient-to-r from-slate-800 via-gray-900 to-black flex items-center justify-center overflow-hidden'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className='absolute inset-0 opacity-60 transition-opacity duration-700'>
          <Background heroCount={heroCount} />
        </div>

        <div className='relative z-10 w-full max-w-6xl px-4 flex flex-col md:flex-row items-center md:items-stretch gap-6'>
          <div className='flex-1 flex items-center justify-center'>
            <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]} />
          </div>

          <div className='hidden md:flex flex-col items-center gap-4'>
            <div className='flex items-center gap-3'>
              <button onClick={goPrev} aria-label='Previous slide' className='p-2 bg-white/10 hover:bg-white/20 text-white rounded-full shadow'>
                ‹
              </button>
              <button onClick={goNext} aria-label='Next slide' className='p-2 bg-white/10 hover:bg-white/20 text-white rounded-full shadow'>
                ›
              </button>
            </div>

            <div className='flex flex-col items-center text-sm text-white/80'>
              <span className='mb-1'>Slide {heroCount + 1} / {heroLen}</span>
              <div className='flex gap-2'>
                {heroData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`w-3 h-3 rounded-full transition-colors ${idx === heroCount ? 'bg-white' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='absolute bottom-6 left-0 right-0 flex justify-center gap-2 md:hidden z-20'>
          {heroData.map((_, idx) => (
            <button key={idx} onClick={() => goTo(idx)} aria-label={`Go to slide ${idx + 1}`} className={`w-2 h-2 rounded-full ${idx === heroCount ? 'bg-white' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>

      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h2 className='text-2xl md:text-3xl font-semibold'>Featured Collections</h2>
            <p className='text-sm text-gray-500 mt-1'>Handpicked pieces — trending now</p>
          </div>

          <div className='flex items-center gap-3'>
            <Link to='/collection' className='text-sm px-3 py-2 bg-white rounded-md shadow-sm hover:shadow-md transition'>View All Collections</Link>
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {products && products.slice(0,8).map(p => (
            <CollectionCard key={p._id} product={p} />
          ))}
        </div>
      </section>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12'>
        <Product/>
        <OurPolicy/>
        <NewsLetter/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home


