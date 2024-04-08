import React, { useEffect, useState } from 'react'
import './loginPage.scss'
import LoginForm from '../../Components/Login Form/LoginForm';
import loginImg from '../../Assets/Images/Login.png'

const LoginPage = ({ setUserName }) => {

  const [page, setPage] = useState("login");

  return (
    <div className='loginScreen'>

      <div className='loginImgArea'>
        <img src={loginImg} alt="login img" />
        <h1>EternaSync</h1>
      </div>

      <div className='loginFormArea'>
        <LoginForm page={page} setPage={setPage} setUserName={setUserName} />
      </div>

    </div>
  )
}

export default LoginPage