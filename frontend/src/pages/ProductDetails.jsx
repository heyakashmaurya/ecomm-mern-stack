
import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import { FaStarHalfAlt } from "react-icons/fa";
import RealtedProduct from '../components/RealtedProduct';
import { authDataContext } from '../context/AuthContext';

function ProductDetails() {
  const { productId } = useParams();
  const { products, currency,addToCart,  } = useContext(shopDataContext);
  const {userData} = useContext(authDataContext)
  const [productData, setProductData] = useState(null);

  const [image, setImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [size, setSize] = useState(null);

  const fetchProductData = () => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
      setImage1(item.image1);
      setImage2(item.image2 );
      setImage3(item.image3 );
      setImage4(item.image4);
      setImage(item.image1);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="w-full min-h-screen py-8 bg-white">
      {/* Main Content Wrapper: Column on mobile, Row on Medium+ devices */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-10 md:items-start justify-center md:pt-20'>
        
        {/* LEFT SIDE: Image Gallery (Thumbnails + Main Image) */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1">
          {/* Thumbnails */}
          <div className="flex lg:flex-col flex-row gap-3 order-2 lg:order-1 overflow-x-auto lg:overflow-visible">
            {[image1, image2, image3, image4].filter(Boolean).map((img, index) => (
              <div 
                key={index} 
                className={`w-[70px] h-[70px] md:w-20 md:h-20 border-2 rounded-lg overflow-hidden shrink-0 cursor-pointer transition-all ${image === img ? 'border-rose-500' : 'border-gray-100'}`} 
                onClick={() => setImage(img)}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
              </div>
            ))}
          </div>

          {/* Main Big Image */}
          <div className="w-full order-1 lg:order-2">
            <img 
              src={image} 
              className="w-full h-[350px] lg:h-[500px] lg:max-h-[550px] object-cover border border-gray-100 rounded-xl shadow-sm" 
              alt="main product" 
            />
          </div>
        </div>

        {/* RIGHT SIDE: Product Description (Pushed to the end for better UX) */}
        <div className='flex-1 flex flex-col justify-start md:justify-end md:pl-6'>
          <div className="max-w-xl">
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>{productData.name.toUpperCase()}</h1>
            
            <div className='flex items-center gap-1 mb-4'>
              <div className="flex text-yellow-400">
                <IoIosStar /><IoIosStar /><IoIosStar /><IoIosStar /><FaStarHalfAlt />
              </div>
              <p className='text-sm font-medium text-gray-500 ml-2'>(1,240 Reviews)</p>
            </div>

            <p className='text-3xl font-extrabold text-rose-600 mb-6'>{currency} {productData.price}</p>
            
            <div className="border-t border-gray-100 pt-6">
              <p className='text-gray-600 text-lg leading-relaxed mb-8'>
                {productData.description || 'Experience premium quality with our latest collection. Designed for comfort and durability.'}
              </p>
            </div>

            {/* Size Selection */}
            <div className='mb-8'>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Select Size</p>
              <div className='flex gap-3 flex-wrap'>
                {productData.sizes && productData.sizes.map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setSize(item)} 
                    className={`min-w-[50px] h-[50px] border-2 rounded-md font-bold transition-all ${item === size ? "bg-black text-white border-black" : "bg-white text-gray-800 border-gray-200 hover:border-black"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => {addToCart(productData._id, size)}} className='w-full py-4 bg-rose-600 text-white font-bold rounded-full shadow-xl hover:bg-rose-700 active:scale-95 transition-all uppercase tracking-wider mb-10'>
              Add to Cart
            </button>

            {/* Service Highlights */}
            <div className='grid grid-cols-1 gap-3 py-6 border-t border-gray-100 text-sm font-semibold text-gray-500'>
              <p className="flex items-center gap-2"><span>🛡️</span> 100% Original Product</p>
              <p className="flex items-center gap-2"><span>🚚</span> Cash on Delivery Available</p>
              <p className="flex items-center gap-2"><span>🔄</span> 7 Days Easy Return Policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description Tab Section */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className='flex gap-0'>
            <span className='border-t-2 border-l-2 border-r-2 border-gray-200 px-8 py-4 font-bold text-sm'>Description</span>
            <span className='border-b-2 border-gray-200 px-8 py-4 text-gray-400 text-sm cursor-pointer hover:bg-gray-50 flex-1'>Reviews (124)</span>
        </div>
        <div className='border-2 border-gray-200 p-8 text-gray-500 text-base leading-8 rounded-b-lg'>
            <p>Our premium products are crafted with the highest quality materials to ensure a perfect fit and long-lasting wear. Each piece undergoes a rigorous quality check to meet international standards.</p>
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-10 md:items-start justify-center md:pt-10'>
        <RealtedProduct category={productData.category} subcategory={productData.subcategory} currendProductId={productData._id} />
        
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default ProductDetails;