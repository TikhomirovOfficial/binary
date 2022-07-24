import React, {useEffect, useState} from 'react';
import useInput from "../../hooks/useInput";
import WrapperForm from "../../components/WrapperForm";
import CreateUser from "../../components/CreateUser";
import ControlUserItem from "../../components/ControlUserItem";
import {Link} from "react-router-dom";
import Api from "../../http/requests";

const AdminUsers = () => {
    const [userForm, setUserForm] = useState(false)
    const [users, setUsers] = useState([])
    const handleDelete = (id) => {
        setUsers(users.filter(item => item.id !== id))
    }

    useEffect(() => {
        Api.getUsers().then((res) => {
            setUsers(res.data)
        })
    }, [])

    const handleUserForm = () => {setUserForm(!userForm)}

    return (
        <>
            {
                userForm ? <CreateUser handleForm={handleUserForm}/>: null
            }

            <div className="wrapper headerAdmin flex-row-betw">
                <div className="d-f al-center gap-5">
                    <Link to={"/admin/panel"}>
                        <h2 className="fw-5">Админ-панель</h2>
                    </Link>

                    <img src="img/arrow_right.svg" alt=""/>
                    <h2 className="fw-5">Управление аккаунтами</h2>
                </div>
            </div>
            <div className="wrapper">
                <div onClick={handleUserForm} className="add-user" style={{color: "green"}}>
                    Добавить пользователя
                </div>
                {
                    users.length ? <div className="users-list flex-column gap-20">
                        {
                            users.map((item, index) => (
                                <ControlUserItem key={index} subscribe={item.subscribe} brokers={item.brokers} onDelete={(id) => handleDelete(id)} login={item.login} id={item.id}/>
                            ))
                        }
                    </div> :
                    <div className="f-center-col" style={{marginTop: 200}}>
                        <h1>Пользователей нет</h1>
                    </div>
                }

            </div>
        </>
    );
};

export default AdminUsers;