import React from 'react'
import './progressionBar.scss'
import progress from '../../Assets/Images/Progress.svg'

const ProgressionBar = ({ level, status }) => {
  return (
    <div className='progressionBar'>

      <div className={`circle1 ${level === 1 && 'active'}`} >{level > 1 ? <img src={progress} alt="check" /> : 1}</div>
      <div className='line1' style={{ backgroundColor: level > 1 ? "#1FA72A" : "#C1C1C1", border: level > 1 && "1px solid #1FA72A" }}></div>
      <div className={`circle2 ${level === 2 && 'active'}`} style={{ backgroundColor: level >= 2 && "#1FA72A", color: level >= 2 && "#FFF", border: level >= 2 && "none" }}>{level > 2 ? <img src={progress} alt="check" /> : 2}</div>
      <div className='line2' style={{ backgroundColor: level > 2 ? "#1FA72A" : "#C1C1C1", border: level > 2 && "1px solid #1FA72A" }}></div>
      <div className={`circle3 ${level === 3 && 'active'}`} style={{ backgroundColor: level === 3 && status === "fail" ? "#C9112B" : level === 3 ? "#1FA72A" : "#FFF", color: level === 3 && "#FFF", border: level === 3 && "none" }}>{status === "success" ? <img src={progress} alt='check' /> : 3}</div>

    </div>
  )
}

export default ProgressionBar