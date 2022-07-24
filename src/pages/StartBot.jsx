import React, {useContext, useState} from 'react';
import WrapperBlock from "../components/WrapperBlock";
import WrapperForm from "../components/WrapperForm";
import {UserContext} from "../App";
import {Link} from "react-router-dom";
import AlertBlock from "../components/AlertBlock";
import {checkSubscribeExpired} from "../utils/checkSubscribeExpired";

const StartBot = () => {
    const {user, logout} = useContext(UserContext)
    const subscribeExpired = checkSubscribeExpired(user.subscribe)
    return (
        <>
            <div className="header w-100p flex-row-betw">
                <div className="d-f gap-20 al-center">
                    <h2 className="profile-name">
                        {user.login}
                    </h2>
                    {
                        user.admin ? <Link to={"/admin/panel"}>Панель админа</Link> : null
                    }

                </div>

                <div onClick={logout} className="logout">
                    Выйти
                </div>
            </div>
            <WrapperBlock>
                {
                    subscribeExpired ?
                        <AlertBlock alertText="Подписка закончилась"/> :
                        <div className="flex-column">
                            <WrapperForm>
                                <div className="flex-column gap-30">
                                    <h1 onClick={logout} className="fw-5">
                                        Выбор Брокера
                                    </h1>
                                    <select className="inputForm" >
                                        {
                                            user.brokers?.map((item) => (
                                                <option value={item}>{item}</option>
                                            ))
                                        }
                                    </select>
                                    <input className="inputForm" type="text" placeholder={"Брокерский логин"}/>
                                    <input className="inputForm" type="password" placeholder={"Брокерский пароль"}/>
                                    <button className="btn c-white" style={{background: '#3BD341'}}>
                                        Запустить
                                    </button>
                                    <p className="errorForm txt-center"></p>
                                </div>
                            </WrapperForm>
                            <a className="help" href="#">Обратиться в поддержку</a>
                        </div>
                }

            </WrapperBlock>
        </>

    );
};

export default StartBot;