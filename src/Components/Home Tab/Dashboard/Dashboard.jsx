import React, { useState } from 'react'
import dashboardOptions from './dashboardOptions';
import './dashboard.scss'

const Dashboard = ({jobs, successJobs, failedJobs}) => {

    const stateMapping = {
        'jobs': jobs,
        'successJobs': successJobs,
        'failedJobs': failedJobs,
      };

    return (
        <div className='dashboard'>
            {
                dashboardOptions.map((item, index)=>{
                    return (
                        <div key={index} className='dashboardOptions' style={{backgroundColor: item.color}}>

                            <div className='iconTab' style={{backgroundColor: item.color, filter: "brightness(98%)"}}>
                                <img src={item.icon} alt="icon" />
                            </div>

                            <div className='textTab'>
                                <p>{item.name}</p>
                                <p className='fileNumber'>{stateMapping[item.number]}</p>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Dashboard