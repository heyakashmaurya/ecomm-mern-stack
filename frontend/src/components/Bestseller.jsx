
import Title from './Title'
import { useState } from 'react'
import { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useEffect } from 'react'
import Card from './Card'

function Bestseller() {
    let {products} = useContext(shopDataContext)
    let [bestSeller, setBestSeller] = useState([])

    useEffect(()=>{
        let filterProduct = products.filter((item) => item.bestseller)
        setBestSeller(filterProduct.slice(0,4));
    }, [products])
  return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Title title1={"BEST"} title2={"SELLER"} />
                <p className="mt-2 text-sm md:text-base text-gray-600">Our All Time Best Seller</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bestSeller.map((item) => (
                        <Card key={item._id} image={item.image1} name={item.name} id={item._id} price={item.price} />
                    ))}
                </div>
            </div>
        </section>
  )
}

export default Bestseller
