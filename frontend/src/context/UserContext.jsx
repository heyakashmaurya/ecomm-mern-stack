import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const userDataContext = createContext();
const UserContext = ({children}) => {
  const [userData, setUserData] = useState("");
  const {serverUrl} = useContext(authDataContext);
  axios.defaults.withCredentials = true;
  
  const getCurrentUser = async () => {
    try {
      let result = await axios.get(serverUrl + '/api/user/getcurrentuser', {withCredentials:true})
      setUserData(result.data)
      toast.success("LoggedIn successfully");
      console.log("usercontext data recieved",result.data)

    } catch (error) {
      setUserData(null)
      // toast.error(error?.response?.data?.message || "Failed to get user");
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])
  
    let value = {
        userData, setUserData,getCurrentUser
    }
  return (
    
    <div>
        <userDataContext.Provider value = {value}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext