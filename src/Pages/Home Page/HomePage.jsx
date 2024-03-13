import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import './homePage.scss'
import HomeTab from '../../Components/Home Tab/HomeTab'
import httpClient from '../../httpClient'
import refreshTokenHandling from '../../Api/refreshToken'
import { useNavigate } from 'react-router-dom'
import SplashScreen from '../../Loaders/Splash Screen/SplashScreen'

const JobsList = () => {

  const navigate = useNavigate();

  const [deletePopup, setDeletePopup] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState();
  const [splash, setSplash] = useState(true);

  const checkCall = async () => {

    setSplash(true);

    await httpClient.get('/user/api/v4/home', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
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

  const refreshtoken = async (task) => {
    const response = await refreshTokenHandling();
    if (response === 200) {
      task === 'deleteTask' ? deleteTask() : checkCall();
    }
    else {
      navigate('/');
    }
  }

  const deleteTask = async () => {
    try {
      await httpClient.delete('/user/api/v4/deleteTask', {
        params: {
          'taskName': toBeDeleted
        },
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      }).then((res) => {
        if (res?.status === 200) {
          setDeletePopup(false);
          setIsDeleted(!isDeleted);
        }
      }).catch((error) => {
        if (error?.response?.status === 401) {
          refreshtoken('deleteTask');
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    splash ? <SplashScreen /> :

      <div>

        <div className='jobsListPage' style={{ filter: deletePopup && 'brightness(40%)', pointerEvents : deletePopup && 'none' }}>
          <Header />
          <div className='jobsTemplate'>
            <HomeTab setDeletePopup={setDeletePopup} setToBeDeleted={setToBeDeleted} isDeleted={isDeleted} setIsDeleted={setIsDeleted} />
          </div>
        </div >

        <div className='deleteConfirmation' style={{ transform: deletePopup && 'translate(-50%, -50%) scale(1)' }}>
          <p className='confirmHeading'>Are you sure you want to delete this task?</p>
          <p className='confirmDescription'>This will delete this Task permanently. You cannot undo this action.</p>
          <div className='confirmButtons'>
            <div className='cancelBtn' onClick={() => setDeletePopup(false)}>
              <p>Cancel</p>
            </div>
            <div className='deleteBtn' onClick={deleteTask}>
              <p>Delete</p>
            </div>
          </div>
        </div>

      </div>
  )
}

export default JobsList