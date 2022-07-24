import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {UserContext} from "../../App";

const AdminPanel = () => {
    const {logout} = useContext(UserContext)
    return (
        <>
            <div className="wrapper headerAdmin flex-row-betw">
                <Link to={"/admin/panel"}>
                    <h2 className="fw-5">Админ-панель</h2>
                </Link>

                <img src="img/arrow-right.svg" alt=""/>
                <div onClick={logout}>Выйти</div>
            </div>
            <div className="wrapper">
                <div className="adminPanel">
                    <Link to={"/admin/users"}>
                        <div className="panel" style={{color: "blue"}}>Управление аккаунтами</div>
                    </Link>
                    <Link to={"/admin/auction"}>
                        <div className="panel" style={{color: "red"}}>Управление торгами</div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AdminPanel;