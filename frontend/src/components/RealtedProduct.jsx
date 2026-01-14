// import React, { useContext, useEffect, useState } from 'react'
// import { shopDataContext } from '../context/ShopContext'
// import Title from "../components/Title"
// import Card from './Card'

// function RealtedProduct({category, subcategory, currendProductId}) {
//     let{products} =useContext(shopDataContext)
//     let [realtedProducts, setRealtedProducts] = useState([])

//     useEffect(() => {
//         if(products.length > 0){
//             let productCopy = [...products] || products;
//             let filteredProducts = productCopy.filter((item) => {
//                 return 
//                 (item.category === category && item.subcategory === subcategory && item._id !== currendProductId)
//             })
//         }
//         setRealtedProducts(filteredProducts.slice(0,4))
//     }, [products, category, subcategory, currendProductId])
//   return (
//     <div className='my-[130x] md:my-[40px] md:mx-[40px] '>
//         <div className='ml-[20px] lg:ml-[80px]  '>
//             <Title title1='Related' title2='Products'/>
//         </div>
//         <div className='w-[100%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px] '>
//             {realtedProducts.map((item,idx) =>{
//                 <Card key={idx} id={item._id} name={item.name} image={item.image1} price={item.price} />
//             }) }
//          </div>
      
//     </div>
//   )
// }

// export default RealtedProduct


import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from "../components/Title"
import Card from './Card'

function RealtedProduct({category, subcategory, currendProductId}) {
    const { products } = useContext(shopDataContext)
    const [realtedProducts, setRealtedProducts] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            // 1. Filter the products
            let productCopy = [...products];
            let filtered = productCopy.filter((item) => {
                // Check category and subcategory, and exclude the current product
                return (
                    item.category === category && 
                    item.subcategory === subcategory && 
                    item._id !== currendProductId
                );
            });
    

            // 2. Set the state ONCE after filtering is done
            setRealtedProducts(filtered.slice(0, 5)); 
        }
    }, [products, category, subcategory, currendProductId, setRealtedProducts]);

    return (
        <div className='my-24 md:my-10'>
            <div className='text-center text-3xl py-2'>
                <Title title1='RELATED' title2='PRODUCTS'/>
            </div>
            
            {/* 3. Grid layout for better responsiveness */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
 
                {realtedProducts.map((item, idx) => (
                    // Added implicit return with ( ) instead of { }
                    <Card 
                        key={idx} 
                        id={item._id} 
                        name={item.name} 
                        image={ item.image1} 
                        price={item.price} 
                    />
                ))}
            </div>
        </div>
    )
}

export default RealtedProduct