import React from 'react'
import './downloadsTable.scss'

const DownloadsTable = ({ downloads }) => {

    return (
        <div className='downloadsTableContainer' style={{display: !downloads && "grid", placeItems: !downloads && "center"}}>
            {downloads ?
                <table>
                    <thead>
                        <tr>
                            <th className='fileNameColumn'>File Name</th>
                            <th className='fileSizeColumn'>File Size</th>
                            <th className='downloadedOnColumn'>Downloaded On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            downloads.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.file_name}</td>
                                        <td>{item.size}</td>
                                        <td>{item.downloaded_at}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                :
                <div>
                    <p className='noDownloads'>No Downloads to display</p>
                </div>
            }
        </div>
    )
}

export default DownloadsTable