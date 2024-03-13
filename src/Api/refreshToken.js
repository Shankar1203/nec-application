import httpClient from "../httpClient";
import {ip} from './ip'


async function refreshTokenHandling() {

    let status = 200;

    await httpClient.get(`${ip}/auth/api/v4/refreshToken`, {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('refresh_token')}`
        }
    }).then((res) => {
        if (res.status === 200) {
            sessionStorage.setItem('token', res.data.content.token);
            sessionStorage.setItem('refresh_token', res.data.content.refresh_token);
        }else{
            status=res.status
        }
    }).catch((error) => {
        status = error?.response?.status;
    });

    return status;
};

export default refreshTokenHandling;