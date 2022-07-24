import React from 'react';
import {Navigate} from "react-router-dom";

const PublicRoute = ({path, Page, isAuth}) => {
    const isAuthPage = path === '/login'
    return (
        !isAuth && !isAuthPage ? <Page/> : <Navigate to={'/'}/>
    );
};

export default PublicRoute;