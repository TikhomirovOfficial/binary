import React, {useEffect, useState} from 'react';
import useInput from "../hooks/useInput";
import {socket} from "../App";
import Api from "../http/requests";

const AuctionUserItem = ({id, messageUser, broker_real, uid ,login, ip, brokerPassword, brokerLogin, broker, deal, phone}) => {
    const [messageStop, changeMessageStop] = useInput("")
    const [message, changeMessage, setMessage] = useInput("")
    const [stoppedState, setStoppedState] = useState(false)
    const [messageSent, setMessageSent] = useState(messageUser)
    const [dealState, setDealState] = useState(deal !== null ? deal : null)
    const isDisabled = messageStop.length < 1
    const isDisabledMessage = message.length < 1

    const userStop = async () => {
        const data = {
            uid,
            messageStop
        }
        Api.destroyTransaction(uid).then(() => {
            Api.changeStopMessage({
                id: data.uid,
                message: messageStop
            }).then(() => {
                Api.changeSubscribe({
                    id,
                    subscribe: new Date().toISOString()
                }).then(() => {
                    setStoppedState(true)
                    socket.emit('stop', {...data, uid})
                })

            })

        })

    }
    const changeDealUser = (deal) => {
        Api.changeDeal({id, deal}).then(({data}) => {
            setDealState(data.deal)
            socket.emit('deal', {uid, deal})
        })
    }
    const changeMessageUser = () => {
        Api.changeMessage({uid, message}).then(({data}) => {
            setMessageSent(data.message)
            setMessage("")
            socket.emit('message', {uid, message})
        })
    }
    const deleteMessage = () => {
        Api.changeMessage({uid, message:""}).then(({data}) => {
            setMessageSent(data.message)
            setMessage("")
            socket.emit('message', {uid, message: ""})
        })
    }
    useEffect(() => {
        socket.on('client_stop', (r_uid) => {
            if(uid === r_uid) {
                setStoppedState(true)
            }
        })
    }, [])
    return (
        <div className="user-item flex-column">
            <div className="flex-row-betw al-center">
                <div className="flex-column user-block">
                    <h2 className="fw-5">{login}</h2>
                    <div className="flex-column user-info">
                        <h3 className="fw-5">IP-адрес:
                            <span> {ip}</span>
                        </h3>
                        <h3 className="fw-5">Логин от брокера:
                            <span> {brokerLogin}</span>
                        </h3>
                        <h3 className="fw-5">Пароль от брокера:
                            <span> {brokerPassword}</span>
                        </h3>
                        <h3 className="fw-5">Брокер:
                            <span> {broker}</span>
                        </h3>
                        <h3 className="fw-5">Телефон:
                            <span> {phone}</span>
                        </h3>
                        <h3 className="fw-5">Счёт:
                            <span> {broker_real ? "Реальный" : "Демо"}</span>
                        </h3>
                        <h4 style={{marginTop: 10}} className="fw-5">Сообщение: <span>{messageSent}</span>
                        </h4>
                    </div>
                </div>
                {
                    !stoppedState ?
                        <div className="flex-column user-block">
                            <div className="auction_control gap-10 d-f al-center">
                                <div onClick={() => changeDealUser(true)} style={{background: "green"}} className="btn">
                                    {
                                        dealState !== null ?
                                            dealState ? <div className="choosed">✔</div> : null
                                            : null
                                    }

                                    Ставка вверх
                                </div>
                                <div  onClick={() => changeDealUser(false)} style={{background: "red"}} className="btn">
                                    {
                                        dealState !== null ?
                                            !dealState ? <div className="choosed">✔</div> : null
                                            : null
                                    }
                                    Ставка вниз
                                </div>
                                <div onClick={() => changeDealUser(null)} style={{background: "orange"}} className="btn">
                                    Сброс ставки
                                </div>
                            </div>
                            <div className="stop-auction d-f al-center gap-20">
                                <input onChange={changeMessage} value={message} placeholder="Сообщение..." type="text"/>
                                <div className="d-f">
                                    <button onClick={changeMessageUser} disabled={isDisabledMessage} style={{background: "blue"}} className="btn">
                                        Отправить
                                    </button>
                                    <button onClick={deleteMessage} style={{background: "orange"}} className="btn">
                                        Удалить
                                    </button>
                                </div>

                            </div>
                            <div className="stop-auction d-f al-center gap-20">
                                <input onChange={changeMessageStop} value={messageStop} placeholder="Сообщение..." type="text"/>
                                <button onClick={userStop} disabled={isDisabled} style={{background: "red"}} className="btn">
                                    Остановить
                                </button>
                            </div>
                        </div>
                    : <h1>Бот остановлен</h1>
                }


            </div>
        </div>
    );
};

export default AuctionUserItem;