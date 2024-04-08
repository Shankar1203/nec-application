import React, { useEffect, useState } from 'react'
import ProgressionBar from '../Progression Bar/ProgressionBar'
import Button from '../Button/Button'
import ToolDetailsTemplate from './ToolDetailsTemplate';

const ToolSelectionArea = ({ tool, TF2Pmigration, glueDatabases, IBM2GlueMigration, setGlueDatabases, T2MBmigration, createDate, taskName, setTaskName, file, setFile, setPage, T2Pmigration }) => {

    const [invalidName, setInvalidName] = useState(false);
    const [uploadFileFormat, setUploadFileFormat] = useState();

    useEffect(() => {
        setTaskName('');
        setFile();
        setGlueDatabases({
            database1: '',
            database2: ''
        })
    }, [])

    return (
        <div className='actionArea'>
            <ProgressionBar level={2} />
            <ToolDetailsTemplate uploadFileFormat={uploadFileFormat} setUploadFileFormat={setUploadFileFormat} tool={tool} glueDatabases={glueDatabases} setGlueDatabases={setGlueDatabases} invalidName={invalidName} setInvalidName={setInvalidName} taskName={taskName} setTaskName={setTaskName} setPage={setPage} file={file} setFile={setFile} />

            <div className='actionButtons'>
                <p>Started creating on: {createDate}</p>
                <div>
                    <div onClick={() => setPage('toolSelect')}><Button content="Previous Step" type="outline" /></div>
                    {(tool === 'IBM Datastage to Glue' ? ((glueDatabases.database1 && glueDatabases.database2 && (glueDatabases.database1 !== glueDatabases.database2)) && (taskName && file && !invalidName)) : (taskName && file && !invalidName)) ? <div onClick={tool === 'Tableau to Power BI' ? T2Pmigration : tool === 'Tableau to Metabase' ? T2MBmigration : tool === 'IBM Datastage to Glue' && IBM2GlueMigration}><Button content="Run" type="fill" /></div> :

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