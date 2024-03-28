import React, { useState } from 'react'
import dropdown from '../../Assets/Images/Dropdown.svg'

const ConnectionForm = ({ connection, setConnection }) => {

  const [serverDropdown, setServerDropdown] = useState(false);

  return (
    <div className='connectionFormTemplate'>
      <p className='heading'>Add Connection</p>

      <div className='connectionFormContainer'>

        <div className='inputTab'>
          <p className='label'>Connection Name</p>
          <input type="text" className='nameInput' value={connection.connectionName} onChange={(e) => setConnection(prev => ({ ...prev, connectionName: e.target.value }))} />
        </div>

        <div className='inputTab'>
          <p className='label'>Server</p>
          <div className='nameInput connectionServer' onClick={()=> setServerDropdown(prev => !prev)}>
            <p>{connection.server==='mysql' ? 'MySQL' : connection.server==='postgres' ? 'Postgres' : 'Select a server'}</p>
            <img src={dropdown} alt="dropdown" style={{ transform: serverDropdown ? "rotate(180deg)" : "rotate(0deg)" }}/>
          </div>
          <div className='connectionDropdown' style={{maxHeight: !serverDropdown && '0rem' }}>
            <p onClick={() => {setConnection(prev => ({ ...prev, server: 'mysql' })); setServerDropdown(false)}}>MySQL</p>
            <p onClick={() => {setConnection(prev => ({ ...prev, server: 'postgres' })); setServerDropdown(false)}}>Postgres</p>
          </div>
        </div>

        <div className='inputTab'>
          <p className='label'>Username</p>
          <input type="text" className='nameInput' value={connection.username} onChange={(e) => setConnection(prev => ({ ...prev, username: e.target.value }))} />
        </div>

        <div className='inputTab'>
          <p className='label'>Password</p>
          <input type="text" className='nameInput' value={connection.password} onChange={(e) => setConnection(prev => ({ ...prev, password: e.target.value }))} />
        </div>

        <div className='inputTab'>
          <p className='label'>Database Name</p>
          <input type="text" className='nameInput' value={connection.dbName} onChange={(e) => setConnection(prev => ({ ...prev, dbName: e.target.value }))} />
        </div>

        <div className='inputTab'>
          <p className='label'>Database Table Name</p>
          <input type="text" className='nameInput' value={connection.dbTableName} onChange={(e) => setConnection(prev => ({ ...prev, dbTableName: e.target.value }))} />
        </div>

        <div className='inputTab'>
          <p className='label'>Host</p>
          <input type="text" className='nameInput' value={connection.host} onChange={(e) => setConnection(prev => ({ ...prev, host: e.target.value }))} />
        </div>

        <div className='inputTab'>
          <p className='label'>Port</p>
          <input type="text" className='nameInput' value={connection.port} onChange={(e) => setConnection(prev => ({ ...prev, port: e.target.value }))} />
        </div>

      </div>
    </div>
  )
}

export default ConnectionForm