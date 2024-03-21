import React from 'react'
import ProgressionBar from '../Progression Bar/ProgressionBar';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import './loadingPage.scss'
import StatusBar from '../Status Bar/StatusBar'

const LoadingPage = ({ createDate, incomingStatus, status}) => {

    return (
        <div className='actionArea'>
            <ProgressionBar level={3} status={status} />

            <h2 className='loadingStatus'>{status === "loading" ? "Migration Initiated…" : status === "success" ? "Migration attempt successful." : status === "fail" && "Migration attempt failed."}</h2>
            <p className='loadingText'>This task will take 6-7 minutes of time, You can go back to home or wait until the process in completed.</p>

            <StatusBar incomingStatus={incomingStatus}/>

            <div className='actionButtons'>
                <p>Started creating on: {createDate}</p>
                <div>
                    <Link to='/home'><Button content="Back to Home" type="fill" /></Link>
                </div>
            </div>
        </div>
    )
}

export default LoadingPage