import React from 'react'
import './button.scss'
import closeIcon from "../../Assets/Images/Close.svg"
import previousIcon from '../../Assets/Images/Previous.svg'
import nextIcon from '../../Assets/Images/Next.svg'

const Button = ({content, type}) => {
  return (
    <div style={{height: (content==="Back to Home" || content==="Run") && "1.6rem", fontWeight: content==="Back to Home" && "600" ,backgroundColor: type==="fill"? "#0066EB" : "white", color: type==="fill"? "white": "#0066EB", border: type==="fill"? "none" : "1px solid #0066EB", boxShadow: type==='fill'? "0px 8px 14px 0px rgba(0, 0, 0, 0.20)": "none"}} className='button'>{content==="Previous Step" ? <img src={previousIcon} alt='Previous icon' /> : content==="Close" ? <img src={closeIcon} alt='Close icon' /> : null}{content}{content==="Next" && <img src={nextIcon} alt='Next icon'/>}</div>
  )
}

export default Button