import React, { useEffect, useState, useRef } from 'react'
import './profilePage.scss'
import Header from '../../Components/Header/Header'
import back from '../../Assets/Images/Back Button.svg'
import profilePic from '../../Assets/Images/Profile Pic.png'
import { Link } from 'react-router-dom'
import DownloadsTable from './DownloadsTable'
import httpClient from '../../httpClient'
import refreshTokenHandling from '../../Api/refreshToken'
import { useNavigate } from 'react-router-dom'
import ProfileLoader from '../../Loaders/Profile Page/ProfileLoader'
import DownloadsLoader from '../../Loaders/Profile Page/DownloadsLoader'
import SplashScreen from '../../Loaders/Splash Screen/SplashScreen'
import editProfile from '../../Assets/Images/Edit Profile.svg'

const ProfilePage = () => {

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [downloads, setDownloads] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(true);
  const [splash, setSplash] = useState(true);

  const handleAddIconClick = () => {
    fileInputRef.current.click();
  };

  const checkCall = async () => {
    setSplash(true);
    await httpClient.get('/user/api/v4/home', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then((res) => {
      if (res?.status === 200) {
        setSplash(false);
        profileCall();
      }
    }).catch(error => {
      refreshtoken('checkCall');
    })
  }

  const profileCall = async () => {
    setLoading(true);
    try {
      await httpClient.get('user/api/v4/userdetails', {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
      }).then((res) => {
        if (res.status === 200) {
          setUserName(res.data.content.username);
          setEmail(res.data.content.email);
          const download_array = res.data.content.download_records;
          setDownloads(download_array.length !== 0 && download_array);
        }
      }).catch((error) => {
        if (error.response.status === 401) {
          refreshtoken('profileCall');
        }
      })

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  }

  const refreshtoken = async (task) => {
    const response = await refreshTokenHandling();
    if (response === 200) {
      task === 'checkCall' ? checkCall() : profileCall();
    }
    else {
      navigate('/');
    }
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
  }

  useEffect(() => {
    checkCall();
  }, [])

  return (

    splash ? <SplashScreen /> :

      <div className='profilePage'>
        <Header />

        <div className='profilePageTemplate'>

          {loading ? <ProfileLoader /> :

            <div className='profileArea'>

              <div className='profileHeading'>
                <Link to='/home'><img src={back} alt="back" /></Link>
                <p>My Profile</p>
              </div>

              <div className='profileContainer'>
                <img src={profilePic} alt="profile" className='profilePic' />
                <div className='editBtn' onClick={handleAddIconClick}>
                  <img src={editProfile} alt="Edit profile" />
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
              />

              <div className='detailsArea'>
                <p className='tabTitle'>User Name</p>
                <p className='details'>{userName}</p>
              </div>

              <div className='detailsArea'>
                <p className='tabTitle'>Email id</p>
                <p className='details'>{email}</p>
              </div>

            </div>}


          {loading ? <DownloadsLoader /> :

            <div className='myDownloads'>
              <p className='downloadsHeading'>My Downloads</p>
              <DownloadsTable downloads={downloads} />
            </div>
          }

        </div>


      </div>
  )
}

export default ProfilePage