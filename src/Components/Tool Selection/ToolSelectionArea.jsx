import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ProgressionBar from '../Progression Bar/ProgressionBar'
import ToolSelectionTemplate from '../Tool Selection/ToolSelectionTemplate'
import Button from '../Button/Button'
import next from '../../Assets/Images/Next.svg'
import httpClient from '../../httpClient';
import refreshTokenHandling from '../../Api/refreshToken';
import { useNavigate } from 'react-router-dom';

const ToolSelectionArea = ({ setToolAccessPopup, role, tool, setTool, createDate, setPage }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [availableTools, setAvailableTools] = useState([]);

    const roleCall = async () => {

        setLoading(true);

        try {
            await httpClient.get('/user/api/v4/toolAccess', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            }).then((res) => {
                if (res?.status === 200) {
                    setAvailableTools(res?.data?.content);
                }
            }).catch(error => {
                refreshtoken();
            })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const refreshtoken = async () => {
        const response = await refreshTokenHandling();
        if (response === 200) {
            roleCall();
        }
        else {
            navigate('/');
        }
    }

    useEffect(() => {
        roleCall();
    }, []);

    return (
        <div className='actionArea'>
            <ProgressionBar level={1} />
            <ToolSelectionTemplate loading={loading} availableTools={availableTools} setToolAccessPopup={setToolAccessPopup} role={role} tool={tool} setTool={setTool} />

            <div className='actionButtons'>
                <p>Started creating on: {createDate}</p>
                <div>
                    <Link to='/home'><Button content="Close" type="outline" /></Link>
                    { (availableTools.includes('admin')) || ((tool === 'Tableau to Power BI' && availableTools.includes('t2p')) || (tool === 'Tableau to Metabase' && availableTools.includes('t2m')) || (tool === 'IBM Datastage to Informatica Powercenter' && availableTools.includes('d2p')) || (tool === 'IBM Datastage to Glue' && availableTools.includes('d2g'))) ?
                        <div onClick={() => setPage('toolDetails')}><Button content="Next" type="fill" /></div> :
                        <div className='restrictBtn'>
                            <p>Next</p>
                            <img src={next} alt="next" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ToolSelectionArea