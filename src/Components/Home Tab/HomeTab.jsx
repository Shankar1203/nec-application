import React, { useEffect, useState } from 'react'
import './homeTab.scss'
import createNew from '../../Assets/Images/Create New.svg'
import { Link } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import JobsTab from '../Jobs Tab/JobsTab'
import httpClient from '../../httpClient'
import refreshTokenHandling from '../../Api/refreshToken'
import { useNavigate } from 'react-router-dom'
import CounterLoader from '../../Loaders/Home Page/CounterLoader'
import ip from '../../Api/ip'

const HomeTab = ({ setDeletePopup, setToBeDeleted, isDeleted }) => {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState(0);
    const [successJobs, setSuccessJobs] = useState(0);
    const [failedJobs, setFailedJobs] = useState(0);
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(0);
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const refreshtoken = async () =>{
            const response = await refreshTokenHandling();
            if (response === 200) {
                homeCall();
            }
            else {
                navigate('/');
            }
        }

        const homeCall = async () => {

            setLoading(true);

            try {
                await httpClient.get(`/user/api/v4/taskRecords/${page}`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }).then((res) => {
                    console.log(res);
                    if (res?.status === 200) {
                        setMaxPages(res.data.content.totalPages)

                        if(page>1 && res.data.content.tasks.length===0){
                            setPage(prev=>prev-1);
                        }

                        setJobs(res.data.content.totalTasks)
                        setSuccessJobs(res.data.content.successful_tasks)
                        setFailedJobs(res.data.content.failed_tasks)
                        setTasks(res.data.content.tasks)

                    }
                }).catch((error) => {
                    if (error?.response?.status === 401) {
                        refreshtoken();
                    }
                });

            } catch (error) {
                console.log("fhgav")
                console.log(error);
                navigate('/');
            } 
            finally {
                setLoading(false);
            }
        };

        homeCall();

    }, [page, isDeleted])


    return (
        <div className='homeTab'>
            <div className='homeTabHeader'>

                <h2>Dashboard</h2>

                <Link to='/newjob'><div className='createJobBtn'>
                    <p>Create Job</p>
                    <img src={createNew} alt="Create New" />
                </div></Link>

            </div>

            <div className='homeTabBody'>
                { loading ? <CounterLoader/> :
                    <Dashboard jobs={jobs} successJobs={successJobs} failedJobs={failedJobs}/>}
            </div>

            <div className='ruler'></div>

            <JobsTab setToBeDeleted={setToBeDeleted} setDeletePopup={setDeletePopup} tasks={tasks} page={page} setPage={setPage} maxPages={maxPages} loading={loading}/>

            {
                maxPages > 1 &&
                <div className='pages'>
                    <div className='pageNo' onClick={() => setPage(prev => prev - 2)} style={{ display: page - 2 <= 0 && "none" }}>
                        {page - 2}
                    </div>
                    <div className='pageNo' onClick={() => setPage(prev => prev - 1)} style={{ display: page - 1 <= 0 && "none" }}>
                        {page - 1}
                    </div>
                    <div className='pageNo active'>
                        {page}
                    </div>
                    <div className='pageNo' onClick={() => setPage(prev => prev + 1)} style={{ display: page + 1 > maxPages && "none" }}>
                        {page + 1}
                    </div>
                    <div className='pageNo' onClick={() => setPage(prev => prev + 2)} style={{ display: page + 2 > maxPages && "none" }}>
                        {page + 2}
                    </div>
                </div>
            }

        </div>
    )
}

export default HomeTab


