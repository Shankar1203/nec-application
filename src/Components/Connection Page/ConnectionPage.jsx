import React, { useState } from 'react'
import ProgressionBar from '../Progression Bar/ProgressionBar'
import Button from '../Button/Button'

const ConnectionPage = ({ setPage }) => {

    const [connection, setConnection] = useState({
        hello: '',
        world: ''
    })

    return (
        <div className='actionArea'>
            <ProgressionBar level={2} />

            <div className='actionButtons' style={{ justifyContent: "right" }}>
                <div onClick={() => setPage('toolDetails')}><Button content="Previous Step" type="outline" /></div>
                {(connection.hello && connection.world) ? <div><Button content="Add Connection" type="fill" /></div> :

                    <div className='disabledBtn'>
                        <p>Add Connection</p>
                    </div>

                }
            </div>
        </div>
    )
}

export default ConnectionPage