import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/Login Page/LoginPage';
import NewJobPage from './Pages/New Job Page/NewJobPage';
import HomePage from './Pages/Home Page/HomePage'
import AboutUs from './Pages/About Us Page/AboutUs';
import NotFoundPage from './Pages/Not Found Page/NotFoundPage';
import QaPage from './Pages/QA Page/QaPage';
import ProfilePage from './Pages/Profile Page/ProfilePage';

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/home" element={<HomePage/>} />
                <Route path="/home/newjob" element={<NewJobPage/>} />
                <Route path="/qa" element={<QaPage/>}/>
                <Route path="/aboutus" element={<AboutUs/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route element={<NotFoundPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router