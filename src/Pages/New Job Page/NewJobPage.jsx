import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import './newJobPage.scss';
import path from '../../Assets/Images/Path.svg';
import ToolSelectionArea from '../../Components/Tool Selection/ToolSelectionArea';
import ToolDetailsArea from '../../Components/Tool Details/ToolDetailsArea';
import httpClient from '../../httpClient';
import LoadingPage from '../../Components/Loading Page/LoadingPage';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import refreshTokenHandling from '../../Api/refreshToken';
import { useNavigate } from 'react-router-dom';
import SplashScreen from '../../Loaders/Splash Screen/SplashScreen';
import toolsList from '../../Components/Tool Selection/toolsList';
import close from '../../Assets/Images/Tool Access Close.svg';
import { ip } from '../../Api/ip';
import ConnectionPage from '../../Components/Connection Page/ConnectionPage';

const NewJobPage = () => {

    const navigate = useNavigate();

    const [socket, setSocket] = useState(null);
    const [page, setPage] = useState('toolSelect');
    const [taskName, setTaskName] = useState('');
    const [file, setFile] = useState();
    const [status, setStatus] = useState('');
    const [createDate, setCreateDate] = useState();
    const [tool, setTool] = useState('Tableau to Power BI');
    const [splash, setSplash] = useState(true);
    const [toolAccessPopup, setToolAccessPopup] = useState(false);
    

    const [incomingStatus, setIncomingStatus] = useState([]);

    const [glueDatabases, setGlueDatabases] = useState({
        database1: '',
        database2: ''
    });

    const progressTracker = (data) => {

        setIncomingStatus((prev) => {
            const updatedProgress = {};
            for (const key in prev) {
                if (prev[key] === 'inprogress') {
                    updatedProgress[key] = 'complete';
                } else {
                    updatedProgress[key] = prev[key];
                }
            }
            updatedProgress[data] = 'inprogress';
            return updatedProgress;
        });

    }

    const [options, setOptions] = useState({
        'Tableau to Power BI': true,
        'Tableau to Metabase': false,
        'IBM Datastage to Informatica Powercenter': false,
        'IBM Datastage to Glue': false,
    })

    const mappedOptions = Object.entries(options).map(([key, value]) => {
        return { name: key, value: value };
    });

    useEffect(() => {
        const initializeSocket = async () => {
            const newSocket = io(`${ip}/task`);

            newSocket.on('connect', () => {
                newSocket.emit('join', { username: sessionStorage.getItem('username') });
                newSocket.on('message', (data) => {
                    console.log(data);
                    progressTracker(data);
                });
            });

            newSocket.on('disconnect', () => {
                console.log('WebSocket disconnected');
            });

            newSocket.on('error', (error) => {
                console.error('WebSocket error:', error);
            });

            setSocket(newSocket);

            await checkCall();

            return () => {
                newSocket.disconnect();
                setSocket(null);
            };
        };

        initializeSocket();
    }, []);

    const checkCall = async () => {

        setSplash(true);

        await httpClient.get('/user/api/v4/home', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then((res) => {
            if (res?.status === 200) {
                setSplash(false);
                const currentDate = new Date();
                const day = currentDate.getDate().toString().padStart(2, '0');
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                const year = currentDate.getFullYear();

                const hours = currentDate.getHours() % 12 || 12;
                const minutes = currentDate.getMinutes().toString().padStart(2, '0');
                const amPm = currentDate.getHours() >= 12 ? 'PM' : 'AM';


                const formattedDateStringDMY = `${day}-${month}-${year} | ${hours}:${minutes} ${amPm}`;

                setCreateDate(formattedDateStringDMY);
            }
        }).catch(error => {
            refreshtoken(null, 'checkCall');
        })

    }

    const refreshtoken = async (e, process) => {
        const response = await refreshTokenHandling();
        if (response === 200) {
            process === 'checkCall' ? checkCall() : process === 't2p' ? T2Pmigration(e) : T2MBmigration(e);
        }
        else {
            navigate('/');
        }
    }

    const T2Pmigration = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setPage('loading');

        try {
            const formData = new FormData();
            formData.append('taskName', taskName);
            formData.append('file', file);

            await httpClient.post('/T2P/api/v4/T2P', formData, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            }).then((res) => {
                if (res?.status === 200) {
                    setIncomingStatus((prev) => {
                        const updatedProgress = {};
                        for (const key in prev) {
                            if (prev[key] === 'inprogress') {
                                updatedProgress[key] = 'complete';
                            } else {
                                updatedProgress[key] = prev[key];
                            }
                        }
                        return updatedProgress;
                    });
                    setStatus('success');
                    Notification.requestPermission().then((result) => {
                        new Notification('Migration Completed successfully', {
                            body: `${taskName} has been successfully migrated.`
                        })
                    });
                }
            }).catch((error) => {
                if (error?.response?.status === 401) {
                    refreshtoken(e, 't2p');
                }
                else {
                    setIncomingStatus((prev) => {
                        const updatedProgress = {};
                        for (const key in prev) {
                            if (prev[key] === 'inprogress') {
                                updatedProgress[key] = 'failed';
                            } else {
                                updatedProgress[key] = prev[key];
                            }
                        }
                        return updatedProgress;
                    });

                    setStatus('fail')
                }
            })

        } catch (error) {
            setIncomingStatus((prev) => {
                const updatedProgress = {};
                for (const key in prev) {
                    if (prev[key] === 'inprogress') {
                        updatedProgress[key] = 'failed';
                    } else {
                        updatedProgress[key] = prev[key];
                    }
                }
                return updatedProgress;
            });
            setStatus('fail');
            console.error('Error:', error);
        }
    };

    const T2MBmigration = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setPage('loading');

        try {
            const formData = new FormData();
            formData.append('taskName', taskName);
            formData.append('file', file);

            await httpClient.post('/T2M/api/v4/T2M', formData, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            }).then((res) => {
                if (res.status === 200) {
                    setIncomingStatus((prev) => {
                        const updatedProgress = {};
                        for (const key in prev) {
                            if (prev[key] === 'inprogress') {
                                updatedProgress[key] = 'complete';
                            } else {
                                updatedProgress[key] = prev[key];
                            }
                        }
                        return updatedProgress;
                    });
                    
                    setStatus('success');

                    Notification.requestPermission().then((result) => {
                        new Notification('Migration Completed successfully', {
                            body: `${taskName} has been successfully migrated.`
                        })
                    });
                }
            }).catch((error) => {
                if (error?.response?.status === 401) {
                    refreshtoken(e, 't2mb');
                } else {
                    setIncomingStatus((prev) => {
                        const updatedProgress = {};
                        for (const key in prev) {
                            if (prev[key] === 'inprogress') {
                                updatedProgress[key] = 'failed';
                            } else {
                                updatedProgress[key] = prev[key];
                            }
                        }
                        return updatedProgress;
                    });
                    setStatus('fail');
                    console.log(error);
                }
            })

        } catch (error) {
            setIncomingStatus((prev) => {
                const updatedProgress = {};
                for (const key in prev) {
                    if (prev[key] === 'inprogress') {
                        updatedProgress[key] = 'failed';
                    } else {
                        updatedProgress[key] = prev[key];
                    }
                }
                return updatedProgress;
            });
            setStatus('fail');
            console.error('Error:', error);
        }

    }

    const IBM2GlueMigration = async (e) => {
        e.preventDefault();

        console.log('IBM Datastage to Glue migration started');
    }

    const selectOptions = (name) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: !prev[name]
            }
        })
    }

    const sendRequest = () => {
        console.log(options);
    }

    return (
        splash ? <SplashScreen /> :

            <div>

                <div className="newJobPage" style={{ filter: toolAccessPopup && 'brightness(40%)', pointerEvents: toolAccessPopup && 'none' }}>
                    <Header />
                    <div className="path">
                        <Link to="/home">
                            <p>Home</p>
                        </Link>
                        <img src={path} alt="Next" />
                        <span>Create New Job</span>
                    </div>

                    {page === 'toolSelect' && <ToolSelectionArea setToolAccessPopup={setToolAccessPopup} tool={tool} setTool={setTool} createDate={createDate} setPage={setPage} />}
                    {page === 'toolDetails' && <ToolDetailsArea IBM2GlueMigration={IBM2GlueMigration} glueDatabases={glueDatabases} setGlueDatabases={setGlueDatabases} tool={tool} createDate={createDate} taskName={taskName} setTaskName={setTaskName} file={file} setFile={setFile} setPage={setPage} T2Pmigration={T2Pmigration} T2MBmigration={T2MBmigration} />}
                    {page === 'loading' && <LoadingPage createDate={createDate} incomingStatus={incomingStatus} status={status} />}
                    {page === 'connection' && <ConnectionPage setPage={setPage}/>}

                </div>

                <div className='toolAccessPopup' style={{ transform: toolAccessPopup && 'translate(-50%, -50%) scale(1)' }}>
                    <img src={close} alt="close" onClick={() => setToolAccessPopup(false)} />

                    <h3 className="heading">Request Tool</h3>
                    <p className="toolAccessText">You can select multiple tools and send request to access them.</p>

                    <div className='toolsContainer' style={{ overflowY: toolsList.length > 4 && 'scroll' }}>
                        {mappedOptions.map((item, index) => {
                            return (
                                <div className='toolsOptions' key={index} onClick={() => selectOptions(item.name)} style={{ flexBasis: index < 2 ? '48%' : '48%', marginBottom: '20px' }}>
                                    {item.name === 'Tableau to Power BI' && <input type="checkbox" defaultChecked={true} />}
                                    {item.name !== 'Tableau to Power BI' && <input type="checkbox" checked={item.value} onChange={() => { }} />}
                                    <p>{item.name}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className='sendRequest' onClick={sendRequest}>
                        <p>Send Request</p>
                    </div>

                </div>

            </div>
    );
};

export default NewJobPage;
