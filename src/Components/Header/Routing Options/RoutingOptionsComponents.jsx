import React from 'react'
import routingOptions from './routingOptions'
import './routingOptions.scss'
import { Link } from 'react-router-dom'

const RoutingOptionsComponents = () => {

    let loc = window.location.hash.split('/')[1]

    return(
    <div className='routingButtonContainer'>
        {routingOptions.map((item, index) => {
            return (
                <Link key={index} to={item.path}><div className='routingButtons' style={{backgroundColor: loc === (item.routing.toLocaleLowerCase())?"#0066EB":"white", color:loc === (item.routing.toLocaleLowerCase())? "white" : "black"}}>
                    <p className='headerOptions'>{item.name}</p>
                </div></Link>
            )
        })}
    </div>
    )
}

export default RoutingOptionsComponents