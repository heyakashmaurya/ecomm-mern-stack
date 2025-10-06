import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from '../components/Title'

const Product = () => {
  let {products} = useContext(shopDataContext)
  return (
     <Title title1 = "Latest" title2 = "Collections" />
  )
}

export default Product