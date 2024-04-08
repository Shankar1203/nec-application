import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import './aboutUs.scss'
import httpClient from '../../httpClient';
import { useNavigate } from 'react-router-dom'
import refreshTokenHandling from '../../Api/refreshToken';
import SplashScreen from '../../Loaders/Splash Screen/SplashScreen';

const AboutUs = () => {

  const navigate = useNavigate();

  const [splash, setSplash] = useState(true);

  useEffect(() => {
    checkCall();
  }, []);

  const checkCall = async () => {

    setSplash(true);

    await httpClient.get('/user/api/v4/home', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      if (res.status === 200) {
        setSplash(false);
      }
    }).catch(error => {
      refreshtoken();
    })

  }

  const refreshtoken = async () => {
    const response = await refreshTokenHandling();
    if (response === 200) {
      checkCall();
    }
    else {
      navigate('/');
    }
  }

  return (

    splash ? <SplashScreen /> :

      <div className='aboutUsPage'>
        <Header />
        <div className='aboutUsTemplate'>
          <div className='aboutArea'>

          </div>
        </div>
      </div >
  )
}

export default AboutUs