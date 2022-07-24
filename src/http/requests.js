import {Axios} from "./axios";
import Cookies from "js-cookie";
import {AuthInstance} from "./authInstance";
const defualtInstance = Axios

const errorChecker = res => {
    //console.log(res);
    const error = res?.data?.error
    if(error) {
        throw new Error(error)
    }
}

const request = async (methodReq, path, data, options = {}) => {
    const method = methodReq.toLowerCase()
    const reqInstance = options.instance || defualtInstance

    // if(options.sendingToken) {
    //     const refreshToken = Cookies.get('refreshToken')
    //     console.log(refreshToken)
    //     data.refreshToken = refreshToken
    // }

    const res = await reqInstance[method](path, data)
    errorChecker(res)
    return res
} 

export default class Api {
    static async registration(data) {
        return await request('POST', '/register', data, {
            instance: AuthInstance()
        })
    }
    static async login(data) {
        return await request('POST', '/login', data)
    }
    static async destroy(data) {
        return await request('POST', '/destroy', data, {
            instance: AuthInstance()
        })
    }
    static async changeBrokers(data) {
        return await request('PUT', '/brokers', data, {
            instance: AuthInstance()
        })
    }
    static async changeSubscribe(data) {
        return await request('PUT', '/subscribe', data, {
            instance: AuthInstance()
        })
    }
    static async logout() {
        return await request('POST', '/logout')
    }
    static async getUsers() {
        return await request('GET', '/users', null, {
            instance: AuthInstance()
        })
    }
    static async refreshToken() {
        return await request('POST', '/refresh', {})
    }
}