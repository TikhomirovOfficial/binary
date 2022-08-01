import React, {createContext, useEffect, useState} from 'react';

import AppRoutes from "./components/routes/AppRoutes";
import {CheckAuth} from "./utils/checkAuth";
import Api from "./http/requests";
import {io} from "socket.io-client";
import {differentDate} from "./utils/differentDate";

export const UserContext = createContext({})
export let socket;

const App = () => {
    const [user, setUser] = useState({})

    const logout = () => {
        Api.logout().then(() => {
            window.location.reload()
        })
    }
    useEffect(() => {

        CheckAuth().then((res) => {
            setUser(res)
            differentDate(new Date().getTime(), new Date(res.subscribe))
            socket = io("http://62.113.99.104/", {query: `id=${res.id}`})
        }).catch(() => {
            setUser({
                admin: false
            })
        })
    }, [])
    return (
        <UserContext.Provider value={{user, logout}}>
            {
                Object.keys(user).length ?
                <AppRoutes isAdmin={user.admin} isAuth={user?.accessToken}/> : null
            }

        </UserContext.Provider>

    );
};

export default App;
