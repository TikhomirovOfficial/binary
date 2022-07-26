import React, {useContext, useEffect, useState} from 'react';
import WrapperBlock from "../components/WrapperBlock";
import WrapperForm from "../components/WrapperForm";
import AlertBlock from "../components/AlertBlock";
import {socket, UserContext} from "../App";
import {Link, useNavigate} from "react-router-dom";
import Api from "../http/requests";

const isAuctionMember = JSON.parse(localStorage.getItem('user_transaction') )
console.log(isAuctionMember)
const Auction = () => {
    const {user, logout} = useContext(UserContext)
    const navigate = useNavigate()
    const [dealIsUp, setDealIsUp] = useState(null)
    const [alertText, setAlertText] = useState("")

    useEffect(() => {
        Api.getTransactionByUser().then(({data}) => {
        }).catch(() => {
            navigate('/')
        })
    }, [])

    useEffect(() => {
        socket.on('auction_action', (data) => {
            setDealIsUp(data)
        })
        socket.on('user_stop', (data) => {
            setAlertText(data)
        })
        socket.on('deal_change', (deal) => {
            setDealIsUp(deal)
        })
    }, [])


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
                {!alertText?
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
                                    dealIsUp === null ?
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
                    : <AlertBlock alertText={alertText}/>


                }
            </WrapperBlock>
        </>
    );
};

export default Auction;