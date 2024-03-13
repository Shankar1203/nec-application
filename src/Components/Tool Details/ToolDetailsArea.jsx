import React, { useEffect, useState } from 'react'
import ProgressionBar from '../Progression Bar/ProgressionBar'
import Button from '../Button/Button'
import ToolDetailsTemplate from './ToolDetailsTemplate';

const ToolSelectionArea = ({tool, T2MBmigration, createDate, taskName, setTaskName, file, setFile, setPage, T2Pmigration}) => {
    
    const [invalidName, setInvalidName] = useState(false);

    useEffect(()=>{
        setTaskName('');
        setFile();
    },[])

    return (
        <div className='actionArea'>
            <ProgressionBar level={2}/>
            <ToolDetailsTemplate tool={tool} invalidName={invalidName} setInvalidName={setInvalidName} taskName={taskName} setTaskName={setTaskName} file={file} setFile={setFile} />

            <div className='actionButtons'>
                <p>Started creating on: {createDate}</p>
                <div>
                    <div onClick={()=> setPage('toolSelect')}><Button content="Previous Step" type="outline" /></div>
                    {(taskName && file && !invalidName) ? <div onClick={tool==='Tableau to Power BI' ? T2Pmigration : tool==='Tableau to Metabase' && T2MBmigration }><Button content="Run" type="fill" /></div> :
                    
                        <div className='disabledBtn'>
                            <p>Run</p>
                        </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default ToolSelectionArea