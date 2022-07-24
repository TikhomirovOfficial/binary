import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true,
    crossDomain: true,
    headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*'
    }
});
export {Axios}