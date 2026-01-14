import React from 'react'

function Title({ title1 = '', title2 = '', subtitle = '', align = 'left' }) {
  const alignItems = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <section className='py-6'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className={`flex flex-col ${alignItems}`}>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight'>
            <span className='inline-block text-indigo-600 mr-2'>{title1}</span>
            <span className='inline-block text-pink-500'>{title2}</span>
          </h2>

          {subtitle && <p className='mt-2 text-sm text-gray-600 max-w-2xl'>{subtitle}</p>}

          <div className={`mt-4 ${align === 'center' ? 'mx-auto' : ''}`}>
            <div className='w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Title