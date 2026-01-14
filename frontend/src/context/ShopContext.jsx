import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { userDataContext } from './UserContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const shopDataContext = createContext()

const ShopContext = ({children}) => {
  let {serverUrl,} = useContext(authDataContext);
  let {userData} = useContext(userDataContext);
    const [products, setProducts] = useState([])
    let [search ,setSearch] = useState("");
    let [showSearch, setShowSearch] = useState(false);
    let [cartItem, setCartItem] = useState ({});
    let [loading, setLoading] = useState (false);
    let currency = "₹";
    let delivery_fee = 40;
    const navigate = useNavigate()

    const getProductLists =  async() => {
        let result = await axios.get(serverUrl + '/api/product/list' , {withCredentials:true})
        setProducts(result.data)
        console.log("here product data",  result.data);
        
    }
    
    const addToCart = async(itemId, size) => { 
      if(!userData) {
        navigate("/login")
        toast.error("Please Login For Place Order")
        return ;
      }
      let cartData = structuredClone(cartItem);
      if(  !size) {
        console.log("Select Product Size")
        toast.error("Please Select the Size")
        return; 
      }
      // let cartData = structuredClone(cartItem);/

      if(cartData[itemId]){ 
        if(cartData[itemId] [size]) {
          cartData[itemId] [size] += 1;
        }else{
          cartData[itemId] [size] = 1; 
        }
      }else{
        cartData[itemId] = {}; 
        cartData[itemId] [size] =1; 
      }

      setCartItem(cartData);
      
      if(userData) {
        setLoading(true);
        try {
          let result = await axios.post(serverUrl + "/api/cart/add" , {itemId, size}, {withCredentials:true})
          setLoading(false);
          toast.success("Item added to cart")
          setCartItem(result.data.cartData)
        } catch (error) {
          console.log(error)
        }finally{
        setLoading(false);
      }
      }else{
        console.log("add error ")
      }

    }

    const getUserCart = async()=> {
      try {
        let result = await axios.post(serverUrl + "/api/cart/get", {}, {withCredentials:true})
        console.log("Server Cart Data:", result.data);
        if (result.data && result.data.cartData) {
            setCartItem(result.data.cartData); 
        }
      } catch (error) {
        toast.error("Failed to fetch cart data")
      }
    }

    const updateQuantity = async(itemId, size, quantity) => {
      let cartData = structuredClone(cartItem);
      cartData[itemId][size] = quantity;
      setCartItem(cartData);
      if(userData) {
        try {
        let result = await axios.post(serverUrl + "/api/cart/update", {itemId, size, quantity}, {withCredentials:true})
        toast.success("Cart updated successfully")
        setCartItem(result.data.cartData)
        
      } catch (error) {
        console.log(error)
      }
      }
    }

    const getCartCount =  () =>{
      let totalCount = 0; 
      for(const items in cartItem) {
        for(const size in cartItem[items]){ 
          try {
            if(cartItem[items][size] >0){
              totalCount += cartItem[items][size];
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
      return totalCount;
    }
    
    const getCartAmount = () => {
      let totalAmount = 0;
      for(const items in cartItem){
        let iteminfo = products.find((product) => product._id === items);
        for (const size in cartItem[items]){
          try {
            if(cartItem[items][size] >0){
              totalAmount += iteminfo.price * cartItem[items][size]; 

            }
          } catch (error) {
            console.log("getcartAmount error " , error)
          }
        }

      }
      return totalAmount;
    }

    useEffect(() => {
      getProductLists()
    }, [])

    useEffect(() => {
        if (userData) {
            getUserCart();
        } else {
            setCartItem({}); // Clear cart if user logs out
        }
    }, [userData]);
    
    let value = {
        products,getProductLists, currency, delivery_fee,search, setSearch, showSearch, setShowSearch, addToCart,getUserCart, cartItem, getCartCount,setCartItem,updateQuantity,getCartAmount
    }
  return (
    <shopDataContext.Provider value={value}>
        {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext