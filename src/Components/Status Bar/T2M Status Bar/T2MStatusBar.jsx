import React, { useEffect, useRef } from 'react';
import '../statusBar.scss';
import check from '../../../Assets/Images/success.svg'
import wait from '../../../Assets/Images/Waiting.svg'

const T2MStatusBar = ({ progress }) => {

    const statusArea = useRef(null);

    useEffect(() => {
        if (progress.MigrationCompleted === 'inprogress' && statusArea.current) {
            statusArea.current.scrollTo({ top: statusArea.current.scrollHeight, behavior: 'smooth' });
        }
    }, [progress]);

    return (
        <div className='statusArea' ref={statusArea}>
            <div className='statusBar'>
                <div className="process" style={{ border: progress.ExtractingData === 'inprogress' && "2px solid #0043CE", backgroundColor: progress.ExtractingData === 'failed' && '#F1C21B' }}>
                    {progress.ExtractingData === 'inprogress' ? <div className='progressCircle'></div> : progress.ExtractingData === 'complete' ? <img src={check} alt='check' className='checkMark' /> : <img src={wait} alt='wait' />}
                    <div className='progressText'>
                        <p>Extracting Data</p>
                        <p className='progressStatus'>{progress.ExtractingData === 'inprogress' ? 'In Progress...' : progress.ExtractingData === 'complete' ? 'Completed' : progress.ExtractingData === 'failed' && 'Failed'}</p>
                    </div>
                </div>
                <div className="jobPath"></div>
                <div className="process" style={{ border: progress.DatabaseAdded === 'inprogress' && "2px solid #0043CE", backgroundColor: progress.DatabaseAdded === 'waiting' ? '#C1C1C1' : progress.DatabaseAdded === 'failed' && '#F1C21B' }}>
                    {progress.DatabaseAdded === 'inprogress' ? <div className='progressCircle'></div> : progress.DatabaseAdded === 'complete' ? <img src={check} alt='check' className='checkMark' /> : <img src={wait} alt='wait' />}
                    <div className='progressText'>
                        <p>Adding Database</p>
                        <p className='progressStatus'>{progress.DatabaseAdded === 'inprogress' ? 'In Progress...' : progress.DatabaseAdded === 'complete' ? 'Completed' : progress.DatabaseAdded === 'failed' ? 'Failed' : 'Waiting'}</p>
                    </div>
                </div>
                <div className="jobPath"></div>
                <div className="process" style={{ border: progress.DatabaseImported === 'inprogress' && "2px solid #0043CE", backgroundColor: progress.DatabaseImported === 'waiting' ? '#C1C1C1' : progress.DatabaseImported === 'failed' && '#F1C21B' }}>
                    {progress.DatabaseImported === 'inprogress' ? <div className='progressCircle'></div> : progress.DatabaseImported === 'complete' ? <img src={check} alt='check' className='checkMark' /> : <img src={wait} alt='wait' />}
                    <div className='progressText'>
                        <p>Importing Database</p>
                        <p className='progressStatus'>{progress.DatabaseImported === 'inprogress' ? 'In Progress...' : progress.DatabaseImported === 'complete' ? 'Completed' : progress.DatabaseImported === 'failed' ? 'Failed' : 'Waiting'}</p>
                    </div>
                </div>
                <div className="jobPath"></div>
                <div className="process" style={{ border: progress.CardsCreated === 'inprogress' && "2px solid #0043CE", backgroundColor: progress.CardsCreated === 'waiting' ? '#C1C1C1' : progress.CardsCreated === 'failed' && '#F1C21B' }}>
                    {progress.CardsCreated === 'inprogress' ? <div className='progressCircle'></div> : progress.CardsCreated === 'complete' ? <img src={check} alt='check' className='checkMark' /> : <img src={wait} alt='wait' />}
                    <div className='progressText'>
                        <p>Creating Cards</p>
                        <p className='progressStatus'>{progress.CardsCreated === 'inprogress' ? 'In Progress...' : progress.CardsCreated === 'complete' ? 'Completed' : progress.CardsCreated === 'failed' ? 'Failed' : 'Waiting'}</p>
                    </div>
                </div>
                <div className="jobPath"></div>
                <div className="process" style={{ border: progress.MigrationCompleted === 'inprogress' && "2px solid #0043CE", backgroundColor: progress.MigrationCompleted === 'waiting' ? '#C1C1C1' : progress.MigrationCompleted === 'failed' && '#F1C21B' }}>
                    {progress.MigrationCompleted === 'inprogress' ? <div className='progressCircle'></div> : progress.MigrationCompleted === 'complete' ? <img src={check} alt='check' className='checkMark' /> : <img src={wait} alt='wait' />}
                    <div className='progressText'>
                        <p>Completing Migration</p>
                        <p className='progressStatus'>{progress.MigrationCompleted === 'inprogress' ? 'In Progress...' : progress.MigrationCompleted === 'complete' ? 'Completed' : progress.MigrationCompleted === 'failed' ? 'Failed' : 'Waiting'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default T2MStatusBar