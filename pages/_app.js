import React, { useState, useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import jwtDecode from 'jwt-decode'
import AuthContext from '../context/AuthContext'
import { useRouter } from 'next/router'
import { setToken, getToken, removeToken } from '../api/token'
import "../scss/global.scss"
import "semantic-ui-css/semantic.min.css"
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
  const [auth , setAuth] = useState(undefined)
  //console.log(auth)
  const router = useRouter()
  const [reloadUser, setReloadUser] = useState(false)


  useEffect(()=>{
    const token = getToken()
    if(token){
      setAuth({
        token, 
        idUser: jwtDecode(token).id,
      })
    }else{
      setAuth(null)
    }
    //console.log(auth)
    setReloadUser(false)
  },[reloadUser])


  const login = (token) => {
    //console.log(token)
    //console.log('estamos en app.js')
    //console.log(jwtDecode(token))
    setToken(token),
    setAuth({
      token, 
      idUser: jwtDecode(token).id,
    })
    
  }


  const logout = () => {
    if(auth){
      removeToken()
      setAuth(null)
      router.push('/')
    }
  }


  const authData = useMemo(()=>({
    auth,
    login,
    logout,
    setReloadUser
  }),[auth])
  if( auth === undefined ) return null
  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>)
}
