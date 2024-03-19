import React from 'react'
import ProgressionBar from '../../Components/Progression Bar/ProgressionBar'
import Button from '../../Components/Button/Button'
import { Link } from 'react-router-dom';
import './loadingPage.scss'
import StatusBar from '../../Components/Status Bar/StatusBar';

const LoadingPage = ({ createDate, incomingStatus, status, setPage }) => {

    return (
        <div className='actionArea'>
            <ProgressionBar level={3} status={status} />

            <h2 className='loadingStatus'>{status === "loading" ? "Migration Initiated…" : status === "success" ? "Migration attempt successful." : status === "fail" && "Migration attempt failed."}</h2>
            <p className='loadingText'>This task will take two-three minutes of time, You can Go Back to home or Wait until the process in completed.</p>

            <StatusBar incomingStatus={incomingStatus}/>

            <div className='actionButtons'>
                <p>Started creating on: {createDate}</p>
                <div>
                    {status === 'fail' && <div onClick={() => setPage('toolDetails')}><Button content="Previous Step" type="outline" /></div>}
                    <Link to='/home'><Button content="Back to Home" type="fill" /></Link>
                </div>
            </div>
        </div>
    )
}

export default LoadingPage