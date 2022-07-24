import React, {createContext, useEffect, useState} from 'react';

import AppRoutes from "./components/routes/AppRoutes";
import {CheckAuth} from "./utils/checkAuth";
import Api from "./http/requests";
import {checkSubscribeExpired} from "./utils/checkSubscribeExpired";


export const UserContext = createContext({})

const App = () => {
    const [user, setUser] = useState({})

    const logout = async() => {
        await Api.logout()
        window.location.href = '/login'
    }
    useEffect(() => {
        CheckAuth().then((res) => {
            setUser(res)
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
