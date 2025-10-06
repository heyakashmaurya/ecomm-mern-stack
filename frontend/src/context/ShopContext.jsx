import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const shopDataContext = createContext()

const ShopContext = ({children}) => {
    const [products, setProducts] = useState([])
    let {serverUrl} = useContext(authDataContext)
    let currency = "₹";
    let delivery_fee = 40;

    const getProductLists =  async() => {
        let result = await axios.get(serverUrl + '/api/product/list' , {withCredentials:true})
        setProducts(result.data)
        console.log(result.data);
        
    }
    
    useEffect(() => {
      getProductLists()
    }, [])
    
    let value = {
        products,getProductLists, currency, delivery_fee
    }
  return (
    <shopDataContext.Provider value={value}>
        {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext