import React from 'react'
import './toolDetailsTemplate.scss'
import ToolDetailsForm from './ToolDetailsForm'

const ToolDetailsTemplate = ({tool, invalidName, setInvalidName ,taskName, setTaskName, file, setFile}) => {
  return (
    <div className='toolDetailsTemplate'>
        <p className='heading'>{tool}</p>
        <ToolDetailsForm tool={tool} invalidName={invalidName} setInvalidName={setInvalidName} taskName={taskName} setTaskName={setTaskName} file={file} setFile={setFile}/>
    </div>
  )
}

export default ToolDetailsTemplate