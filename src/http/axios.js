import axios from "axios";
import {SERVER_URL} from "../config/cfg";

const Axios = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
    crossDomain: true,
    headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*'
    }
});
export {Axios}