import React, { useState } from 'react'
import './loginForm.scss'
import { login } from './SigninCredentials'
import Input from './Input'
import { signup } from './SigninCredentials'
import toast from '../../Assets/Images/Toast.svg'
import toastClose from '../../Assets/Images/Toast close.svg'

const LoginForm = ({ page, setPage }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginkey, setLoginkey] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false)
  const [errorType, setErrorType] = useState("")
  const [invalidRegisterCredentials, setInvalidRegisterCredentials] = useState({
    invalidUsername: false,
    invalidEmail: false,
    invalidPassword: false,
    invalidConfirmPassword: false,
  })
  const [invalidEmailType, setInvalidEmailType] = useState(false);

  const credentials = page === "login" ? login : signup

  const cleanUp = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setConfirmPassword("");
    setLoginkey("");
  }

  const pageChange = () => {
    page === 'login' ? setPage("register") : setPage('login');
    setInvalidCredentials(false);
    cleanUp();
    setInvalidRegisterCredentials({
      invalidEmail: false,
      invalidUsername: false,
      invalidPassword: false,
    })
  }

  return (
    <div className='loginForm'>
      {/* <img src={logo} alt="logo" className='logo' /> */}
      <div className='welcomeText'>
        <h1>EternaSync</h1>
        {page === 'login' && <p className='loginText'>"Eterna" draws inspiration from eternity, symbolising the enduring and consistent nature of automation. "Sync" emphasises seamless synchronisation and connection across various tools.</p>}
      </div>

      <div className='invalidCredentialsPopup' style={{ display: invalidCredentials ? "flex" : "none" }}>
        <img src={toast} alt='toast' />
        <div className='toastTextArea'>
          <p className='toastHeading'>{errorType === 404 ? "User Not Found" : errorType === 401 ? "Wrong Credentials" : errorType === 'empty' ? "Please Fill All The Tabs" : errorType === 'invalid' ? 'Please Enter Valid Credentials' : "Something Went Wrong"}</p>
          <p>{errorType === 401 ? "The username or password you entered is incorrect." : errorType === 404 ? "Your account is not registered." : errorType === 'empty' ? "Some of the tabs are empty." : errorType === 'invalid' ? "The credentials you've entered are invalid" : "Sorry for the inconvenience"}</p>
        </div>
        <img src={toastClose} alt="close" className='toastClose' onClick={() => setInvalidCredentials(false)} />
      </div>

      <Input invalidEmailType={invalidEmailType} setInvalidEmailType={setInvalidEmailType} invalidRegisterCredentials={invalidRegisterCredentials} setInvalidRegisterCredentials={setInvalidRegisterCredentials} setErrorType={setErrorType} setInvalidCredentials={setInvalidCredentials} cleanUp={cleanUp} page={page} setPage={setPage} credentials={credentials} email={email} setEmail={setEmail} password={password} setPassword={setPassword} username={username} setUsername={setUsername} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} loginkey={loginkey} setLoginkey={setLoginkey} />
      {page === "login" ?
        <p className='pageSwitch'><span className='infoText'>Don't have an account?</span><span onClick={pageChange} className='nextPage'>Register now</span></p>
        :
        <p className='pageSwitch'><span className='infoText'>Already have an account?</span><span onClick={pageChange} className='nextPage'>Sign In</span></p>
      }
    </div>
  )
}

export default LoginForm