import React, {useEffect, useState} from 'react';
import AuctionUserItem from "../../components/AuctionUserItem";
import {Link} from "react-router-dom";
import {socket} from "../../App";
import Api from "../../http/requests";

const AdminAuction = () => {
    const [usersInAuction, setUsersInAuction] = useState([])

    useEffect(() => {
        Api.getUsersInAuction().then(({data}) => {
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
                    usersInAuction.length ?
                        <div className="users-list flex-column gap-20">
                            {
                                usersInAuction.map((item) => (
                                    <AuctionUserItem
                                        id={item.id}
                                        uid={item.uid}
                                        login={item.login}
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