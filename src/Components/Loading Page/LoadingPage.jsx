import React from 'react'
import ProgressionBar from '../Progression Bar/ProgressionBar'
import Button from '../Button/Button'
import { Link } from 'react-router-dom';
import './loadingPage.scss'
import T2PStatusBar from '../Status Bar/T2P Status Bar/T2PStatusBar';
import T2MStatusBar from '../Status Bar/T2M Status Bar/T2MStatusBar';

const LoadingPage = ({ createDate, t2pProgress, t2mProgress, tool, status, setPage }) => {

    return (
        <div className='actionArea'>
            <ProgressionBar level={3} status={status} />

            <h2 className='loadingStatus'>{status === "loading" ? "Migration Initiated…" : status === "success" ? "Migration attempt successful." : status === "fail" && "Migration attempt failed."}</h2>
            <p className='loadingText'>This task will take two-three minutes of time, You can Go Back to home or Wait until the process in completed.</p>

            { tool==='Tableau to Power BI' ?
                <T2PStatusBar progress={t2pProgress} /> :
                <T2MStatusBar progress={t2mProgress}/>
            }

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