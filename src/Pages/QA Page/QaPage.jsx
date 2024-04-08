import React, { useEffect, useState } from 'react'
import './qaPage.scss'
import Header from '../../Components/Header/Header'
import CompareArea from './CompareArea'
import httpClient from '../../httpClient'
import refreshTokenHandling from '../../Api/refreshToken'
import { useNavigate } from 'react-router-dom'
import SplashScreen from '../../Loaders/Splash Screen/SplashScreen'

const QaPage = () => {

  const navigate = useNavigate();

  const [tableauInput, setTableauInput] = useState();
  const [powerBiInput, setPowerBiInput] = useState();
  const [outputImg, setOutputImg] = useState();
  const [splash, setSplash] = useState(true);


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
      refreshtoken('checkCall');
    })
  }


  useEffect(() => {
    checkCall();
  }, []);

  
  const refreshtoken = async (e) => {
    const response = await refreshTokenHandling();
    if (response === 200) {
      e === 'checkCall' ? checkCall() : compare(e);
    }
    else {
      navigate('/');
    }
  }

  const compare = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image1', tableauInput);
      formData.append('image2', powerBiInput);

      await httpClient.post('/user/api/v4/qa', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: 'arraybuffer',
      }).then((res) => {
        if (res.data instanceof ArrayBuffer) {
          const blob = new Blob([res.data], { type: 'image/png' });

          const imageUrl = URL.createObjectURL(blob);

          setOutputImg(imageUrl);
        }
      }).catch((error) => {
        if (error.response.status === 401) {
          refreshtoken(e);
        }
      })

    } catch (error) {
      console.error(error);
    }
  }

  return (

    splash ? <SplashScreen /> :

      <div className='qaPage'>
        <Header />

        <div className='qaTemplate'>
          <div className='workArea'>
            <p className='qaHeading'>QA Validation</p>
            <CompareArea outputImg={outputImg} tableauInput={tableauInput} powerBiInput={powerBiInput} setTableauInput={setTableauInput} setPowerBiInput={setPowerBiInput} />
            <div onClick={(tableauInput && powerBiInput) && compare} className='button' style={{ backgroundColor: (tableauInput && powerBiInput) ? "#0066EB" : "#DADADA", color: (tableauInput && powerBiInput) ? "white" : "#9B9B9B"}}>
              <p>Run</p>
            </div>
          </div>
        </div>

      </div>
  )
}

export default QaPage