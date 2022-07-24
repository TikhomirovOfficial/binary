import React from 'react';
import useInput from "../hooks/useInput";

const AuctionUserItem = () => {
    const [messageStop, changeMessageStop] = useInput("")
    const isDisabled = messageStop.length < 1

    return (
        <div className="user-item flex-column">
            <div className="flex-row-betw">
                <div className="flex-column user-block">
                    <h2 className="fw-5">User1</h2>
                    <div className="flex-column user-info">
                        <h3 className="fw-5">IP-адрес:
                            <span> 255.255.255.255</span>
                        </h3>
                        <h3 className="fw-5">Логин от брокера:
                            <span> Логин</span>
                        </h3>
                        <h3 className="fw-5">Пароль от брокера:
                            <span> пароль</span>
                        </h3>
                        <h3 className="fw-5">Брокер:
                            <span> brocker</span>
                        </h3>
                        <h3 className="fw-5">Счёт:
                            <span> Реальный</span>
                        </h3>
                    </div>
                </div>
                <div className="flex-column user-block">
                    <div className="auction_control gap-10 d-f al-center">
                        <div style={{background: "green"}} className="btn">
                            Ставка вверх
                        </div>
                        <div style={{background: "red"}} className="btn">
                            Ставка вниз
                        </div>
                    </div>
                    <div className="stop-auction d-f al-center gap-20">
                        <input onChange={changeMessageStop} value={messageStop} placeholder="Сообщение..." type="text"/>
                        <button disabled={isDisabled} style={{background: "red"}} className="btn">
                            Остановить
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuctionUserItem;