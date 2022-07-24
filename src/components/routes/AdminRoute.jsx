import React from 'react';
import {Navigate} from "react-router-dom";

const AdminRoute = ({Page, isAuth, isAdmin}) => {
    return (
        isAuth && isAdmin ? <Page/> : <Navigate to={'/login'}/>
    );
};

export default AdminRoute;