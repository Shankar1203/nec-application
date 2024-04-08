import httpClient from "../httpClient";
import {ip} from './ip'


async function refreshTokenHandling() {

    let status = 200;

    await httpClient.get(`${ip}/auth/api/v4/refreshToken`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`
        }
    }).then((res) => {
        if (res.status === 200) {
            localStorage.setItem('token', res.data.content.token);
            localStorage.setItem('refresh_token', res.data.content.refresh_token);
        }else{
            status=res.status
        }
    }).catch((error) => {
        status = error?.response?.status;
    });

    return status;
};

export default refreshTokenHandling;