import React from 'react'
import './toolDetailForm.scss'
import FileUpload from '../File Upload Input/FileUpload'
import httpClient from '../../httpClient'
import refreshTokenHandling from '../../Api/refreshToken'
import { useNavigate } from 'react-router-dom'

const ToolDetailsForm = ({ tool, invalidName, setInvalidName, taskName, setTaskName, file, setFile }) => {

  const navigate = useNavigate();

  const refreshtoken = async (event) => {
    const response = await refreshTokenHandling();
    if (response === 200) {
      nameCheck(event);
    }
    else {
      navigate('/');
    }
  }

  const nameCheck = async (event) => {
    setTaskName(event.target.value);
    try {
      await httpClient.get('/T2P/api/v4/taskName', {
        params: {
          'taskName': event.target.value,
        },
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
      }).then((res) => {
        if (res?.status === 200) {
          setInvalidName(res.data.content);
        }
      }).catch((error) => {
        if (error?.response?.status === 401) {
          refreshtoken(event);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='formContainer'>

      <div>
        <p className='label'>Task Name</p>
        <input type="text" className='nameInput' value={taskName} onChange={nameCheck} placeholder='Enter Here' style={{ border: invalidName && "1px solid red" }} />
        {invalidName && <p className='errorText'>Task name already exists</p>}
      </div>

      <FileUpload tool={tool} file={file} setFile={setFile} />
    </div>
  )
}

export default ToolDetailsForm