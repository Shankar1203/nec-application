import React, { useState } from 'react'
import './header.scss'
import RoutingOptionsComponents from './Routing Options/RoutingOptionsComponents'
import notificationIcon from '../../Assets/Images/Notification.svg'
import { useNavigate } from 'react-router-dom'
import profilePic from '../../Assets/Images/Profile Pic.png'
import dropDownImg from '../../Assets/Images/Dropdown.svg'
import ProfileIcon from '../../Assets/Images/Profile Dropdown.svg'
import logoutIcon from '../../Assets/Images/Logout Dropdown.svg'
import { Link } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();
    const [dropDown, setDropDown] = useState(false);

    const logOut = () => {
        localStorage.clear()
        navigate('/');
    }

    return (
        <div className='headerBar'>
            <div className='headerContentBox'>


                <div className='logo'>
                    <p>EternaSync</p>
                </div>


                <RoutingOptionsComponents />


                <div className='profileArea'>

                    <div className='notification'>
                        <img src={notificationIcon} alt="Notification Icon" />
                    </div>

                    <div className='profile' onClick={() => setDropDown(prev => !prev)}>
                        <div><img src={profilePic} alt="profile picture" className='profilePic' /></div>
                        <p>{localStorage.getItem('username')}</p>
                        <img src={dropDownImg} alt="Dropdown Icon" className='dropDownIcon' style={{ transform: dropDown ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </div>

                </div>

            </div>

            <div className='dropDrop' style={{ height: dropDown ? "6.3125rem" : "0rem" }}>
                <Link to='/profile'><div>
                    <img src={ProfileIcon} alt="Profile Icon" />
                    <p>Profile</p>
                </div></Link>
                <div onClick={logOut}>
                    <img src={logoutIcon} alt="Logout Icon" />
                    <p>Log out</p>
                </div>
            </div>
        </div>
    )
}

export default Header