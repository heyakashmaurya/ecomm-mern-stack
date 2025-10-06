import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { authDataContext } from './AuthContext';
import { useEffect } from 'react';
import axios from 'axios';

export const adminDataContext = createContext();


const AdminContext = ({children}) => {
  
  const [adminData, setAdminData] = useState(null);
  let {serverUrl} = useContext(authDataContext)

  const getCurrentAdmin = async() => {
    try {
    const result = await axios.get(serverUrl + "/api/user/getcurrentadmin", {
      withCredentials: true
    });
    setAdminData(result.data);
    console.log(result.data);
  } catch (error) {
    setAdminData(null);
    console.log("getcurrent admin error ", error);
  }
  }

  useEffect(() => {
    getCurrentAdmin()
  }, [])
  

  let value = {adminData, setAdminData , getCurrentAdmin}
  return (
    <div>
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    </div>
  )
}

export default AdminContext