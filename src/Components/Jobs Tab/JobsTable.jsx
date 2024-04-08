import React, { useEffect, useState } from 'react';
import './jobsTable.scss';
import download from '../../Assets/Images/Table download.svg';
import httpClient from '../../httpClient';
import noFiles from '../../Assets/Images/No Files.gif';
import deleteIcon from '../../Assets/Images/Delete.svg';
import refreshTokenHandling from '../../Api/refreshToken';
import { useNavigate } from 'react-router-dom';

const JobsTable = ({ tasks, setDeletePopup, setToBeDeleted }) => {

  const navigate = useNavigate();
  const [toBeDownloaded, setToBeDownloaded] = useState()

  useEffect(() => {
    if (toBeDownloaded) {
      downloadFile();
    }
  }, [toBeDownloaded]);

  const refreshtoken = async () => {
    const response = await refreshTokenHandling();
    if (response !== 200) {
      navigate('/');
    }
  }

  const initiateDownload = (taskname) => {
    setToBeDownloaded(taskname);
  }

  const downloadFile = async () => {
    try {

      await httpClient.get('/user/api/v4/downloadFile', {
        params: {
          'taskname': toBeDownloaded,
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: 'blob',
      }).then((res) => {
        if (res.status === 200) {

          const blob = new Blob([res.data], {
            type: 'application/zip',
          });

          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = toBeDownloaded;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }).catch((error) => {
        if (error?.response?.status === 401) {
          refreshtoken();
        }
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <div className='emptyTable'>
          <div>
            <img src={noFiles} alt="No files" style={{ transform: "scale(1.3)" }} />
            <p className='noTasks'>No Tasks to display</p>
          </div>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th className='nameColumn'>Task Name</th>
              <th className='toolColumn'>Tool Used</th>
              <th className='sTimeColumn'>Start Time</th>
              <th className='eTimeColumn'>End Time</th>
              <th className='statusColumn'>Status</th>
              <th className='actionsColumn'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item, index) => (
              <tr key={index}>
                <td>{item.taskName}</td>
                <td>{item.toolName}</td>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
                <td>{item.status === 'success' ? <div className='completeStatus'>Completed</div> : <div className='errorStatus'>Error</div>}</td>
                <td className='actionsCol'>

                    <div className='interactCol'>
                      {item.status==='success' && (item.toolName === 'T2M' ? <a href='http://192.168.0.11:3000' target='blank' className='redirect'>Redirect</a> :
                      <div className='downloadBtn' onClick={() => { initiateDownload(item.taskName) }}>
                        <p>Download</p>
                        <img src={download} alt="download" />
                      </div>)}
                    </div>

                  <div className='deleteCol'><img src={deleteIcon} alt="delete" className='deleteIcon' onClick={() => { setDeletePopup(true); setToBeDeleted(item.taskName) }} /></div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobsTable;
