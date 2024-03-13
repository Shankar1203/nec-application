import React, { useEffect, useRef } from 'react'
import '../statusBar.scss'
import check from '../../../Assets/Images/success.svg'
import wait from '../../../Assets/Images/Waiting.svg'

const StatusBar = ({ progress }) => {

    const statusArea = useRef(null);

    useEffect(() => {
        if (progress.DataUploadingToPowerBiService === 'inprogress' && statusArea.current) {
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
                <div className="process" style={{ border: progress.ExtractingDataSource === 'inprogress' && "2px solid #0043CE", backgroundColor: progress.ExtractingDataSource === 'waiting' ? '#C1C1C1' : progress.ExtractingDataSource === 'failed' && '#F1C21B' }}>
                    {progress.ExtractingDataSource === 'inprogress' ? <div className='progressCircle'></div> : progress.ExtractingDataSource === 'complete' ? <img src={check} alt='check' className='checkMark' /> : <img src={wait} alt='wait' />}
                    <div className='progressText'>
                        <p>Extracting Data Source</p>
                        <p className='progressStatus'>{progress.ExtractingDataSource === 'inprogress' ? 'In Progress...' : progress.ExtractingDataSource === 'complete' ? 'Completed' : progress.ExtractingDataSource === 'failed' ? 'Failed' : 'Waiting'}</p>
                    </div>
                </div>
                <div className="jobPath"></div>
                <div className="process" style={{ border: progress.GeneratingManualGuide === 'inprogress' && "2px solid #0043CE", backgroundColor: progress.GeneratingManualGuide === 'waiting' ? '#C1C1C1' : progress.GeneratingManualGuide === 'failed' && '#F1C21B' }}>
                    {progress.GeneratingManualGuide === 'inprogress' ? <div className='progressCircle'></div> : progress.GeneratingManualGuide === 'complete' ? <img src={check} alt='check' className='checkMark' /> : <img src={wait} alt='wait' />}
                    <div className='progressText'>
                        <p>Generating Manual Guide</p>
                        <p className='progressStatus'>{progress.GeneratingManualGuide === 'inprogress' ? 'In Progress...' : progress.GeneratingManualGuide === 'complete' ? 'Completed' : progress.GeneratingManualGuide === 'failed' ? 'Failed' : 'Waiting'}</p>
                    </div>
                </div>
                <div className="jobPath"></div>
                <div className="process" style={{ border: progress.ExtractingCalculatedFields === 'inprogress' && "2px solid #0043CE", backgroundColor: progress.ExtractingCalculatedFields === 'waiting' ? '#C1C1C1' : progress.ExtractingCalculatedFields === 'failed' && '#F1C21B' }}>
                    {progress.ExtractingCalculatedFields === 'inprogress' ? <div className='progressCircle'></div> : progress.ExtractingCalculatedFields === 'complete' ? <img src={check} alt='check' className='checkMark' /> : <img src={wait} alt='wait' />}
                    <div className='progressText'>
                        <p>Extracting Calculated Fields</p><p className='progressStatus'>{progress.ExtractingCalculatedFields === 'inprogress' ? 'In Progress...' : progress.ExtractingCalculatedFields === 'complete' ? 'Completed' : progress.ExtractingCalculatedFields === 'failed' ? 'Failed' : 'Waiting'}</p>
                    </div>
                </div>
                <div className="jobPath"></div>
                <div className="process" style={{ border: progress.DataUploadingToPowerBiService === 'inprogress' && "2px solid #0043CE", backgroundColor: progress.DataUploadingToPowerBiService === 'waiting' ? '#C1C1C1' : progress.DataUploadingToPowerBiService === 'failed' && '#F1C21B' }}>
                    {progress.DataUploadingToPowerBiService === 'inprogress' ? <div className='progressCircle'></div> : progress.DataUploadingToPowerBiService === 'complete' ? <img src={check} alt='check' className='checkMark' /> : <img src={wait} alt='wait' />}
                    <div className='progressText'>
                        <p>Data Uploading To PowerBi</p><p className='progressStatus'>{progress.DataUploadingToPowerBiService === 'inprogress' ? 'In Progress...' : progress.DataUploadingToPowerBiService === 'complete' ? 'Completed' : progress.DataUploadingToPowerBiService === 'failed' ? 'Failed' : 'Waiting'}</p>
                    </div>
                </div>
                <div className="jobPath"></div>
                <div className="process" style={{ border: progress.CreatingReport === 'inprogress' && "2px solid #0043CE", backgroundColor: progress.CreatingReport === 'waiting' ? '#C1C1C1' : progress.CreatingReport === 'failed' && '#F1C21B' }}>
                    {progress.CreatingReport === 'inprogress' ? <div className='progressCircle'></div> : progress.CreatingReport === 'complete' ? <img src={check} alt='check' className='checkMark' /> : <img src={wait} alt='wait' />}
                    <div className='progressText'>
                        <p>Creating Report</p>
                        <p className='progressStatus'>{progress.CreatingReport === 'inprogress' ? 'In Progress...' : progress.CreatingReport === 'complete' ? 'Completed' : progress.CreatingReport === 'failed' ? 'Failed' : 'Waiting'}</p>
                    </div>
                </div>
                <div className="jobPath"></div>
                <div className="process" style={{ border: progress.SavingReport === 'inprogress' && "2px solid #0043CE", backgroundColor: progress.SavingReport === 'waiting' ? '#C1C1C1' : progress.SavingReport === 'failed' && '#F1C21B' }}>
                    {progress.SavingReport === 'inprogress' ? <div className='progressCircle'></div> : progress.SavingReport === 'complete' ? <img src={check} alt='check' className='checkMark' /> : <img src={wait} alt='wait' />}
                    <div className='progressText'>
                        <p>Saving Report</p>
                        <p className='progressStatus'>{progress.SavingReport === 'inprogress' ? 'In Progress...' : progress.SavingReport === 'complete' ? 'Completed' : progress.SavingReport === 'failed' ? 'Failed' : 'Waiting'}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default StatusBar