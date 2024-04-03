import React from 'react'
import './toolSelectionTemplate.scss'
import toolsList from './toolsList'
import convert from '../../Assets/Images/Convert.svg'
import lock from '../../Assets/Images/Access Denied.svg'
import toolAccess from '../../Assets/Images/Tool Access.svg'
import ToolSelectionLoader from '../../Loaders/Tool Selection Area/ToolSelectionLoader'


const ToolSelectionTemplate = ({ availableTools, loading, setToolAccessPopup, tool, setTool }) => {

  return (
    <div className='toolSelectionTab'>

      <div className='toolSelectionHeader'>

        <p className='heading'>Tool Selection</p>

        <div className='toolAccessBtn' onClick={() => setToolAccessPopup(true)}>
          <p>Request Tools</p>
          <img src={toolAccess} alt="Tool Access" />
        </div>

      </div>

      <div className='visibleTools' style={{ overflowY: toolsList.length > 3 && "scroll" }}>
        {loading ?
          toolsList.map((item, index) => {
            return (
              <ToolSelectionLoader key={index} />
            )
          })
          :
          toolsList.map((item) => {
            return (
              <div key={item.id} onClick={() => setTool(item.name)} className='toolContainer' style={{ backgroundColor: item.name === tool ? "#DBECFF" : "white", border: item.name === tool ? "2px solid #0067FF" : "1px solid #C1C1C1" }}>

                <div className='checkbox' style={{ border: item.name === tool ? "2px solid #0067FF" : "2px solid #959595" }}>
                  {item.name === tool && <div className='selectionIndicator'></div>}
                </div>

                <div className='toolImage'>
                  <img src={item.from} alt="Tool" />
                  <img src={convert} alt="to" className='toIcon' />
                  <img src={item.to} alt="Tool" />
                </div>

                <div className='textArea'>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                </div>

                { (availableTools.includes('admin')) || !((item.name === 'Tableau to Power BI' && (availableTools.includes('t2p'))) || (item.name === 'Tableau to Metabase' && availableTools.includes('t2m')) || (item.name === 'IBM Datastage to Informatica Powercenter' && availableTools.includes('d2p')) || (item.name === 'IBM Datastage to Glue' && availableTools.includes('d2g'))) &&
                  <div className='deniedAccess'>
                    <p>No access permission</p>
                    <img src={lock} alt="locked" />
                  </div>
                }

              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default ToolSelectionTemplate