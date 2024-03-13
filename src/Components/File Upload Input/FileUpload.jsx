import React, { useEffect, useRef, useState } from 'react'
import uploadIcon from '../../Assets/Images/Upload.svg'
import twbxIcon from '../../Assets/Images/twbx.webp'
import xmlIcon from '../../Assets/Images/xlm.svg'
import deleteIcon from '../../Assets/Images/Delete.svg'
import invalidType from '../../Assets/Images/Invalid File.svg'

const FileUpload = ({ tool, file, setFile }) => {

    const fileInputRef = useRef(null);

    const [invalidFileType, setInvalidFileType] = useState(false);

    const fileSelect = () => {
        fileInputRef.current.click();
    }

    const validateFileType = (selectedFile) => {

        if (tool === 'Tableau to Power BI' || tool === 'Tableau to Metabase') {
            if ((selectedFile.name.split('.')[1]).toLowerCase() === 'twbx') {
                setFile(selectedFile);
                setInvalidFileType(false);
            }
            else {
                setFile(null);
                setInvalidFileType(true);
            }
        } else {
            if ((selectedFile.name.split('.')[1]).toLowerCase() === 'xml') {
                setFile(selectedFile);
                setInvalidFileType(false);
            }
            else {
                setFile(null);
                setInvalidFileType(true);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setInvalidFileType(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;

        if (files.length > 0) {
            const droppedFile = files[0];
            validateFileType(droppedFile);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        event.target.value = null;
        const validFile = ((tool === 'Tableau to Power BI' || tool === 'Tableau to Metabase') && selectedFile.name.split('.')[1]) === 'twbx' ? true : ((tool === 'IBM Datastage to Informatica Powercenter' || tool === 'IBM Datastage to Glue') && selectedFile.name.split('.')[1]) === 'xml' ? true : false;

        if (validFile) {
            setFile(selectedFile);
            setInvalidFileType(false);
        }
        else {
            setInvalidFileType(true);
        }


    }

    const formatFileSize = (sizeInBytes) => {
        const sizeInKB = sizeInBytes / 1024;
        return sizeInKB.toFixed(2) + ' kb';
    };

    return (
        <div>
            <p className='label'>Upload {(tool === 'Tableau to Power BI' || tool === 'Tableau to Metabase') ? 'TWBX' : 'XML'} File</p>
            <div className='uploadInput' onDragOver={handleDragOver} onDrop={handleDrop} style={{ border: invalidFileType && '2px dashed #C9262A' }}>
                {file ?
                    <div className='filePresent'>
                        <div>
                            <img src={(tool === 'Tableau to Power BI' || tool === 'Tableau to Metabase') ? twbxIcon : xmlIcon} alt="File icon" className='fileIcon' />
                            <div className='fileData'>
                                <p className='fileName'>{file.name}</p>
                                <p className='fileSize'>{formatFileSize(file.size)}</p>
                            </div>
                        </div>

                        <img src={deleteIcon} alt="Delete" className='deleteIcon' onClick={() => setFile("")} />
                    </div>
                    : <div className='fileAbsent' onDragOver={handleDragOver} onDrop={handleDrop}>
                        <img className='uploadIcon' src={uploadIcon} alt="uploadIcon" onDragOver={handleDragOver} onDrop={handleDrop} />
                        <p className='uploadText' onDragOver={handleDragOver} onDrop={handleDrop}>Drag and Drop files here or <span onClick={fileSelect}>choose file</span></p>
                    </div>
                }
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept={(tool === 'Tableau to Power BI' || tool === 'Tableau to Metabase') ? ".twbx" : ".xml"}
                />
            </div>

            {invalidFileType && <div className='invalidTypePopup'>
                <img src={invalidType} alt="invalid file type" />
                <p className='errorText'>File format could not be recognised. Please try uploading with <span>{(tool === 'Tableau to Power BI' || tool === 'Tableau to Metabase') ? 'TWBX' : 'XML'} File.</span></p>
            </div>}

        </div>
    )
}

export default FileUpload