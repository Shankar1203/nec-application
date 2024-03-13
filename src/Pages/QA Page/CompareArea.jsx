import React, { useState } from 'react';
import './compareArea.scss';
import outputIcon from '../../Assets/Images/Output Area Icon.png';
import FileInput from './FileInput';
import zoomOut from '../../Assets/Images/Zoom out.svg'
import zoomIn from '../../Assets/Images/Zoom in.svg'

const CompareArea = ({ outputImg, tableauInput, powerBiInput, setTableauInput, setPowerBiInput }) => {

    const [zoom, setZoom] = useState(1)

    const imageUpload = [
        {
            inputName: "tableauInput"
        },
        {
            inputName: "powerBiInput"
        }
    ];

    const zooming = (status) => {
        if (status === 'out') {
            setZoom((prev) => {
                if (prev > 1) {
                    return prev - 0.3
                }
                else {
                    setZoom(1);
                }
            })
        } else {
            setZoom((prev) => {
                return prev + 0.3
            })
        }
    }

    return (
        <div className='compareArea'>

            <div className='uploadArea'>
                {imageUpload.map((item, index) => (
                    <FileInput key={index} tableauInput={tableauInput} powerBiInput={powerBiInput} setTableauInput={setTableauInput} setPowerBiInput={setPowerBiInput} inputName={item.inputName} />
                ))}
            </div>

            <div className='divider'></div>

            <div className='outputArea'>
                <p className='outputText'>Image results will be displayed here</p>
                {outputImg ?
                    <div className='outerOutputBox'>
                        <div className='outputBox' style={{ backgroundColor: '#D0D5DD40' }}>
                            <img src={outputImg} alt="Output" className='outputImg' style={{ transform: `scale(${zoom})` }} />
                        </div>
                        <div className='zooming'>

                            <div className='zoomOut' onClick={() => zooming('out')}>
                                <img src={zoomOut} alt="zoom out" />
                            </div>

                            <div className='zoomDivider'></div>

                            <div className='zoomIn' onClick={() => zooming('in')}>
                                <img src={zoomIn} alt="zoom in" />
                            </div>

                        </div>
                    </div>
                    :
                    <div className='outerOutputBox'>
                        <div className='outputBox'>
                            <img src={outputIcon} alt="Output" className='outputIcon' />
                        </div>
                    </div>
                }
            </div>

        </div>
    );
}

export default CompareArea;
