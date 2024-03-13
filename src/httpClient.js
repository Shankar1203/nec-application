import axios from "axios";
import {ip} from './Api/ip'

export default axios.create({
    withCredentials:false,
    baseURL: ip,
    headers: {
        'ngrok-skip-browser-warning': 'true',
    }
});