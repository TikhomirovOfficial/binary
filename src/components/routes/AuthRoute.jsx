import React from 'react';
import {Navigate} from "react-router-dom";

const AuthRoute = ({Page, isAuth}) => {
    return (
        isAuth ? <Page/> : <Navigate to={'/login'}/>
    );
};

export default AuthRoute;