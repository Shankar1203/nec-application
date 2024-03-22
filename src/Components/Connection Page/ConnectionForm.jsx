import React from 'react'

const ConnectionForm = ({ connection, setConnection }) => {
  return (
    <div className='connectionFormTemplate'>
      <p className='heading'>Add Connection</p>

      <div className='connectionFormContainer'>

        <div className='inputTab'>
          <p className='label'>Username</p>
          <input type="text" className='nameInput' value={connection.username} onChange={(e)=>setConnection(prev=> ({...prev, username: e.target.value}))}/>
        </div>

        <div className='inputTab'>
          <p className='label'>Password</p>
          <input type="text" className='nameInput' value={connection.password} onChange={(e)=>setConnection(prev=> ({...prev, password: e.target.value}))}/>
        </div>

        <div className='inputTab'>
          <p className='label'>Source DB Name</p>
          <input type="text" className='nameInput' value={connection.sourceDbName} onChange={(e)=>setConnection(prev=> ({...prev, sourceDbName: e.target.value}))}/>
        </div>

        <div className='inputTab'>
          <p className='label'>Source DB Table Name</p>
          <input type="text" className='nameInput' value={connection.sourceDbTableName} onChange={(e)=>setConnection(prev=> ({...prev, sourceDbTableName: e.target.value}))}/>
        </div>

        <div className='inputTab'>
          <p className='label'>Destination DB Name</p>
          <input type="text" className='nameInput' value={connection.destinationDbName} onChange={(e)=>setConnection(prev=> ({...prev, destinationDbName: e.target.value}))}/>
        </div>

        <div className='inputTab'>
          <p className='label'>Destination DB Table Name</p>
          <input type="text" className='nameInput' value={connection.destinationDbTableName} onChange={(e)=>setConnection(prev=> ({...prev, destinationDbTableName: e.target.value}))}/>
        </div>

        <div className='inputTab'>
          <p className='label'>Host</p>
          <input type="text" className='nameInput' value={connection.host} onChange={(e)=>setConnection(prev=> ({...prev, host: e.target.value}))}/>
        </div>

        <div className='inputTab'>
          <p className='label'>Port</p>
          <input type="text" className='nameInput' value={connection.port} onChange={(e)=>setConnection(prev=> ({...prev, port: e.target.value}))}/>
        </div>

      </div>
    </div>
  )
}

export default ConnectionForm