import React, {useEffect, useState} from 'react';
import AuctionUserItem from "../../components/AuctionUserItem";
import {Link} from "react-router-dom";
import {socket} from "../../App";
import Api from "../../http/requests";
import useInput from "../../hooks/useInput";

const AdminAuction = () => {
    const [usersInAuction, setUsersInAuction] = useState([])
    const [messageStopAll, changeMessageStopAll] = useInput("")
    const isDisabled = messageStopAll.length < 1

    const changeDealUserAll = (deal) => {
        Api.changeDealAll(deal).then(async({data})=>{
            socket.emit('change_deal', data)
            window.location.reload()
        })
    }
    const stopAllUsers = () => {
         Api.stopAll(messageStopAll).then(({data}) => {
            console.log(data)
            socket.emit('stop_all', data)
            window.location.reload()
        })
    }
    useEffect(() => {
        Api.getUsersInAuction().then(({data}) => {
            console.log('suka')
            const users = data.auctionUsers.map((user) => {
                return {
                    login: data.users.filter(item => item.id === user.uid)[0].login,
                    ...user
                }
            })
            setUsersInAuction(users)
        })
    }, [])

    useEffect(() => {
        console.log(usersInAuction)
        socket.on('user_join', (data) => {
            setUsersInAuction(prev => [...prev, data])
        })

    }, [])


    return (
        <>
            <div className="wrapper headerAdmin flex-row-betw">
                <div className="d-f al-center gap-5">
                    <Link to={"/admin/panel"}>
                        <h2 className="fw-5">Админ-панель</h2>
                    </Link>

                    >
                    <h2 className="fw-5">Управление торгами</h2>
                </div>

            </div>
            <div className="wrapper">
                {
                    usersInAuction.length ? <div className="d-f js-end" style={{marginTop: 30}}>

                        <div className="d-f gap-15">
                            <div className="stop-auction d-f al-center gap-20">
                                <input onChange={changeMessageStopAll} value={messageStopAll} placeholder="Сообщение всем..." type="text"/>
                                <button onClick={stopAllUsers} disabled={isDisabled} style={{background: "red"}} className="btn">
                                    Остановить
                                </button>
                            </div>
                            <div onClick={() => changeDealUserAll(true)} style={{background: "green"}} className="btn">
                                Ставка вверх
                            </div>
                            <div  onClick={() => changeDealUserAll(false)} style={{background: "red"}} className="btn">
                                Ставка вниз
                            </div>
                        </div>
                    </div> : null
                }

                {
                    usersInAuction.length ?
                        <div style={{marginBottom: 50}} className="users-list flex-column gap-20">
                            {
                                usersInAuction.map((item) => (
                                    <AuctionUserItem
                                        id={item.id}
                                        broker_real={item.broker_real}
                                        uid={item.uid}
                                        login={item.login}
                                        messageUser={item.message}
                                                     broker={item.broker}
                                                     brokerLogin={item.broker_login}
                                                     brokerPassword={item.broker_password}
                                                     deal={item.deal}
                                                     ip={item.ip}
                                                     phone={item.phone}
                                    />
                                ))
                            }
                        </div> :
                    <h1 style={{marginTop: 200}} className={"txt-center"}>Сделок нет</h1>
                }

            </div>
        </>
    )
};

export default AdminAuction;