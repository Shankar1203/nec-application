import React, { useRef, useState } from 'react'
import UploadIcon from '../../Assets/Images/Upload Area Icon.svg';
import addIcon from '../../Assets/Images/Create New.svg';
import close from '../../Assets/Images/Remove Screenshot.svg'
import invalid from '../../Assets/Images/Invalid File.svg'

const FileInput = ({ inputName, tableauInput, powerBiInput, setTableauInput, setPowerBiInput }) => {

    const fileInputRef = useRef(null);
    const [invalidFile1, setInvalidFile1] = useState(false);
    const [invalidFile2, setInvalidFile2] = useState(false);


    const [file, setFile] = useState();

    const handleAddIconClick = () => {
        fileInputRef.current.click();
    };

    const removeScreenshot = () => {
        if (inputName === 'tableauInput') {
            setTableauInput();
        } else {
            setPowerBiInput();
        }
    }

    const validateFileType = (selectedFile) => {

        const validFile = selectedFile?.name?.split('.')[1] === 'png' ||
            selectedFile?.name?.split('.')[1] === 'jpg' ||
            selectedFile?.name?.split('.')[1] === 'jpeg';

        if (validFile) {
            console.log(selectedFile.name.split('.')[1]);
            if (inputName === 'tableauInput') {
                setTableauInput(selectedFile);
                setFile(URL.createObjectURL(selectedFile));
                setInvalidFile1(false);
            } else {
                setPowerBiInput(selectedFile);
                setFile(URL.createObjectURL(selectedFile));
                setInvalidFile2(false);
            }
        } else {
            if (inputName === 'tableauInput') {
                setTableauInput();
                setInvalidFile1(true)
            } else {
                setPowerBiInput();
                setInvalidFile2(true)
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        inputName === 'tableauInput' ? setInvalidFile1(false) : setInvalidFile2(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;

        if (files.length > 0) {
            const droppedFile = files[0];
            console.log(droppedFile);
            validateFileType(droppedFile);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        event.target.value = null;
        const validFile = selectedFile.name.split('.')[1] === 'png' ||
            selectedFile.name.split('.')[1] === 'jpg' ||
            selectedFile.name.split('.')[1] === 'jpeg';

        if (validFile) {
            if (inputName === "tableauInput") {
                setTableauInput(selectedFile)
                setFile(URL.createObjectURL(selectedFile))
                setInvalidFile1(false);
            }
            else {
                setPowerBiInput(selectedFile)
                setFile(URL.createObjectURL(selectedFile))
                setInvalidFile2(false);
            }
        } else {
            if (inputName === "tableauInput") {
                setInvalidFile1(true);
            }
            else {
                setInvalidFile2(true);
            }
        }
    }

    return (
        <div>
            <li className='uploadHeading'>Upload <span>{inputName === "tableauInput" ? "Tableau" : "PowerBi"}</span> Image here</li>

            {(inputName === 'tableauInput' && !tableauInput) ||
                (inputName === 'powerBiInput' && !powerBiInput) ?

                <div>
                    <div className='uploadBox' onDragOver={handleDragOver} onDrop={handleDrop}>
                        <img src={UploadIcon} alt="Upload" />
                        <p className='uploadText'>Browse and choose the files you want to upload from your computer <br /> supports png, jpg, jpeg</p>
                        <div className='addIcon' onClick={handleAddIconClick}>
                            <img src={addIcon} alt="Add Icon" />
                        </div>
                    </div>
                    {((inputName === 'tableauInput' && invalidFile1) || (inputName === 'powerBiInput' && invalidFile2)) &&
                        <div className='invalidImgUpload'>
                            <img src={invalid} alt="invalid file type" />
                            <p className='invalidText'>File format could not be recognised.</p>
                        </div>
                    }
                </div>

                :

                <div className='uploadBox' style={{ alignItems: "start", paddingLeft: "2rem", boxSizing: 'border-box', backgroundColor: '#D0D5DD40' }}>
                    <div className='imgContainer'>
                        <div className='removeScreenshot'><img src={close} alt="close" onClick={removeScreenshot} /></div>
                        <img src={file} alt="file" className='imgPreview' />
                    </div>
                </div>

            }

            <input
                type="file"
                name={inputName}
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
            />
        </div >
    );
}

export default FileInput