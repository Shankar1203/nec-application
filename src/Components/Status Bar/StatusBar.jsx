import React, { useEffect, useRef } from 'react'
import './statusBar.scss'
import check from '../../Assets/Images/success.svg'
import failed from '../../Assets/Images/Migration Failed.png'

const StatusBar = ({ incomingStatus }) => {

    const statusArea = useRef(null);

    useEffect(() => {
        statusArea.current.scrollTo({ top: statusArea.current.scrollHeight, behavior: 'smooth' });
    }, [incomingStatus]);

    return (
        <div className='statusArea' ref={statusArea}>
            {Object.keys(incomingStatus).map((item, index) => {
                return (
                    <div className='statusBar' key={index}>
                        {index !== 0 &&
                            <div className="jobPath"></div>
                        }
                        <div className={`process ${incomingStatus[item] === 'inprogress' && 'active'}`} style={{ border: incomingStatus[item] === 'inprogress' && "2px solid #0043CE", backgroundColor: incomingStatus[item] === 'failed' && '#C9112B' }}>
                            {incomingStatus[item] === 'inprogress' ? <div className='progressCircle'></div> : incomingStatus[item] === 'complete' ? <img src={check} alt='check' className='checkMark' /> : incomingStatus[item] ==='failed' && <img style={{filter: "brightness(0) invert(1)"}} src={failed} alt="failed" />}
                            <div className='progressText'>
                                <p>{item}</p>
                                <p className='progressStatus'>{incomingStatus[item] === 'inprogress' ? 'In Progress...' : incomingStatus[item] === 'complete' ? 'Completed' : incomingStatus[item] === 'failed' && 'Failed'}</p>
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}

export default StatusBar