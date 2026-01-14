import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card';

const LatestCollection = () => {
  let {products} = useContext(shopDataContext);
  let [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0,8));
  },[products] )
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Title title1={'LATEST'} title2={'COLLECTIONS'} />
        <p className="mt-2 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">Check out our newest arrivals!</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestProducts.map((item) => (
            <Card key={item._id} name={item.name} image={item.image1} id={item._id} price={item.price} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestCollection