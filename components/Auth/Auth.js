import React, { useState } from 'react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

export default function Auth(props){
  const {onCloseModal, setTitleModal} = props;
  const [showLogin, setShowLogin] = useState(true)
  const showLoginForm = () =>{
    setTitleModal("Iniciar Sesión");
    setShowLogin(true)
  }
  const showRegisterForm = () => {
    setTitleModal("Registro de usuario");
    setShowLogin(false)
  }



  return showLogin ? <LoginForm showRegisterForm={showRegisterForm} onCloseModal={onCloseModal} /> : <RegisterForm  onCloseModal={onCloseModal} showLoginForm={showLoginForm}/>

}
