import React from 'react';
import {Link} from "react-router-dom";

const AlertBlock = ({alertText}) => {
    return (
        <div>
            <h1 className={"alertText txt-center"}>{alertText ? alertText : "Бот приостановлен"}</h1>
            <div className="d-f gap-30">
                <Link to={'/'}>
                    Личный кабинет
                </Link>
                <a href="" className="help d-b ml-auto">Обратиться в тех.поддержку</a>
            </div>

        </div>
    );
};

export default AlertBlock;