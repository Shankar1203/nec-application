import React, { useState } from 'react'
import ProgressionBar from '../Progression Bar/ProgressionBar'
import Button from '../Button/Button'
import ConnectionForm from './ConnectionForm'
import './connectionPage.scss'

const ConnectionPage = ({ setPage }) => {

    const [connection, setConnection] = useState({
        username: '',
        password: '',
        sourceDbName: '',
        sourceDbTableName: '',
        destinationDbName: '',
        destinationDbTableName: '',
        host: '',
        port: ''
    })

    return (
        <div className='actionArea'>
            <ProgressionBar level={2} />
            <ConnectionForm connection={connection} setConnection={setConnection}/>

            <div className='actionButtons' style={{ justifyContent: "right" }}>
                <div onClick={() => setPage('toolDetails')}><Button content="Previous Step" type="outline" /></div>
                {(connection.username && connection.password && connection.sourceDbName && connection.sourceDbTableName && connection.destinationDbName && connection.destinationDbTableName && connection.host && connection.port) ? <div><Button content="Add Connection" type="fill" /></div> :

                    <div className='disabledBtn'>
                        <p>Add Connection</p>
                    </div>

                }
            </div>
        </div>
    )
}

export default ConnectionPage