import { Axios } from './axios'
import axios from 'axios';
import Cookies from 'js-cookie'
import Login from "../pages/Login";
import {SERVER_URL} from "../config/cfg";


export const AuthInstance = () => {
    const token = Cookies.get('token')
    const instance =  Axios.create({
        baseURL: SERVER_URL,
        withCredentials: true,
        crossDomain: true,
        headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Credentials': true,
            "Access-Control-Allow-Origin": "*",
            'X-Client-IP': true,
            "x-forwarded-for": true
        }
    });
    let _isRetry = false
    instance.interceptors.response.use(async (config) => {
        const originalReq = config
        //ДЕЛАТЬ ЗАПРОС ЗАНОВО, ЕСЛИ ОШИБКА
        if(originalReq.data.code == 401 && !_isRetry){
            //console.log(_isRetry);
            console.log(originalReq.data.code == 401 && !_isRetry)
            console.log(originalReq.data.code)
            _isRetry = true
            console.log(_isRetry)
            //console.log("work");
            const res = await Axios.post(`/refresh`)
                .then(async ({data}) => {
                    return data
                })
                .then(async (data) => {
                    console.log(originalReq.config)
                    originalReq.config.headers.Authorization = `Bearer ${data.accessToken}`
                    return await axios.request(originalReq.config);
                    
                })
                .catch((e) => {
                    console.log(e);
                }) 
            //console.log(res.data);
            return res
        }
        return config
        
       
    })
    return instance
    
}