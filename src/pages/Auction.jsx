import React, {useContext, useState} from 'react';
import WrapperBlock from "../components/WrapperBlock";
import WrapperForm from "../components/WrapperForm";
import AlertBlock from "../components/AlertBlock";
import {UserContext} from "../App";
import {Link} from "react-router-dom";

const Auction = () => {
    const {user, logout} = useContext(UserContext)
    const [isEnabled, setIsEnabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [dealIsUp, setDealIsUp] = useState(true)
    const [alertText, setAlertText] = useState("")
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
                {isEnabled ?
                    <div className="flex-column">
                        <WrapperForm className="auctionBlock">
                            <div className="f-center-col gap-30">
                                <h1 className="fw-5">
                                    Бот запущен
                                </h1>
                                <p className="auctionProccess">
                                    Идут торги
                                    <span>.</span>
                                    <span>.</span>
                                    <span>.</span>
                                </p>
                                {
                                    isLoading ?
                                        <div>
                                            <img className="preload" src="img/preload.svg" alt=""/>
                                        </div>
                                        :

                                        dealIsUp ?
                                            <div className="f-center-col gap-20 auctionContent">
                                                <img className="auctionContent__img" src="img/up.svg" alt=""/>
                                                <p style={{color: "lightgreen"}} className="auctionContent__text">Сделка
                                                    открыта вверх</p>
                                            </div>
                                            :
                                            <div className="f-center-col gap-20 auctionContent">
                                                <img className="auctionContent__img" src="img/down.svg" alt=""/>
                                                <p style={{color: "red"}} className="auctionContent__text">Сделка
                                                    открыта вниз</p>
                                            </div>

                                }


                                <button className="btn c-white" style={{background: '#3BD341'}}>
                                    Остановить
                                </button>
                            </div>


                        </WrapperForm>
                        <a className="help" href="#">Обратиться в поддержку</a>
                    </div>
                    :
                    <AlertBlock alertText={alertText}/>
                }
            </WrapperBlock>
        </>
    );
};

export default Auction;