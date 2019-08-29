import React from 'react'
import { useState, useEffect, createContext } from 'react'
import { isTokenExpired, getAuthToken } from '../services/auth'

export const UserContext = createContext()
export const UserProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)  
  useEffect(() => {
    const token = getAuthToken()
    if(token && isTokenExpired(token)){
        setIsLoggedIn(true)
    }
  }, [])
  
  return (
    <UserContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      {children}
    </UserContext.Provider>
  )
}