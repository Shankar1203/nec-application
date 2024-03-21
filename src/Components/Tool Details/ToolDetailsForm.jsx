import React, { useState } from 'react'
import './toolDetailForm.scss'
import FileUpload from '../File Upload Input/FileUpload'
import httpClient from '../../httpClient'
import refreshTokenHandling from '../../Api/refreshToken'
import { useNavigate } from 'react-router-dom'
import dropdown from '../../Assets/Images/Dropdown.svg'

const ToolDetailsForm = ({ tool, invalidName, glueDatabases, setGlueDatabases, setInvalidName, taskName, setTaskName, file, setFile }) => {

  const navigate = useNavigate();

  const [databaseDropdown, setDatabaseDropdown] = useState({
    dropdown1: false,
    dropdown2: false
  });

  const databaseList = ['World Government', 'Cipher Pol 9', 'Revolutionary Army', 'Warlords'];

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
    <div>
      <div className='formContainer'  style={{marginTop: tool === 'IBM Datastage to Glue' && "1rem"}}>

        <div>
          <p className='label'>Task Name</p>
          <input type="text" className='nameInput' value={taskName} onChange={nameCheck} placeholder='Enter Here' style={{ border: invalidName && "1px solid red" }} />
          {invalidName && <p className='errorText'>Task name already exists</p>}
        </div>

        <FileUpload tool={tool} file={file} setFile={setFile} />

      </div>

      {tool === 'IBM Datastage to Glue' && <hr className='databaseOptionDivider' />}

      {tool === 'IBM Datastage to Glue' &&
        <div className='databaseOption'>

          <div>
            <p className='label'>Source Database</p>
            <div className='nameInput' onClick={() => setDatabaseDropdown(prev => ({ ...prev, dropdown1: !prev.dropdown1 }))}>
              <p>{!glueDatabases.database1 ? 'Database 1' : glueDatabases.database1}</p>
              <img src={dropdown} alt="drop down" style={{ transform: databaseDropdown.dropdown1 ? "rotate(180deg)" : "rotate(0deg)" }} />
            </div>
            <div className='dropdown' style={{ maxHeight: !databaseDropdown.dropdown1 && "0rem" }}>
              {databaseList.map((database) => {
                return <p onClick={() => { setGlueDatabases(prev => ({ ...prev, database1: database })); setDatabaseDropdown(prev => ({ ...prev, dropdown1: false })) }}>{database}</p>
              })
              }
            </div>
          </div>

          <div>
            <p className='label'>Target Database</p>
            <div className='nameInput' onClick={() => setDatabaseDropdown(prev => ({ ...prev, dropdown2: !prev.dropdown2 }))}>
              <p>{!glueDatabases.database2 ? 'Database 2' : glueDatabases.database2}</p>
              <img src={dropdown} alt="drop down" style={{ transform: databaseDropdown.dropdown2 ? "rotate(180deg)" : "rotate(0deg)" }} />
            </div>
            <div className='dropdown' style={{ maxHeight: !databaseDropdown.dropdown2 && "0rem" }}>
              {databaseList.map((database) => {
                return <p onClick={() => { setGlueDatabases(prev => ({ ...prev, database2: database })); setDatabaseDropdown(prev => ({ ...prev, dropdown2: false })) }}>{database}</p>
              })
              }
            </div>
          </div>
        </div>


      }
    </div>
  )
}

export default ToolDetailsForm