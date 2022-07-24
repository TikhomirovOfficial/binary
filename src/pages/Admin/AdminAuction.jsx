import React from 'react';
import AuctionUserItem from "../../components/AuctionUserItem";
import {Link} from "react-router-dom";

const AdminAuction = () => {
    return (
        <>
            <div className="wrapper headerAdmin flex-row-betw">
                <div className="d-f al-center gap-5">
                    <Link to={"/admin/panel"}>
                        <h2 className="fw-5">Админ-панель</h2>
                    </Link>

                    <img src="img/arrow_right.svg" alt=""/>
                    <h2 className="fw-5">Управление торгами</h2>
                </div>

            </div>
            <div className="wrapper">
                <div className="users-list flex-column gap-20">
                    <AuctionUserItem/>
                    <AuctionUserItem/>
                    <AuctionUserItem/>
                    <AuctionUserItem/>
                </div>
            </div>
        </>
    )
};

export default AdminAuction;