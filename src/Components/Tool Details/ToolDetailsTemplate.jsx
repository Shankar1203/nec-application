import React from 'react'
import './toolDetailsTemplate.scss'
import ToolDetailsForm from './ToolDetailsForm'
import add from '../../Assets/Images/Add Connection.svg'

const ToolDetailsTemplate = ({ setPage, tool, glueDatabases, setGlueDatabases, invalidName, setInvalidName, taskName, setTaskName, file, setFile }) => {
  return (
    <div className='toolDetailsTemplate'>
      {tool === 'IBM Datastage to Glue' ?
        <div className='d2gHeader'>
          <p className='heading'>{tool}</p>
          <div onClick={()=> setPage('connection')}>
            <img src={add} alt="add" />
            <p>Add New Connection</p>
          </div>
        </div> :
        <p className='heading'>{tool}</p>
      }
      <ToolDetailsForm tool={tool} glueDatabases={glueDatabases} setGlueDatabases={setGlueDatabases} invalidName={invalidName} setInvalidName={setInvalidName} taskName={taskName} setTaskName={setTaskName} file={file} setFile={setFile} />
    </div>
  )
}

export default ToolDetailsTemplate