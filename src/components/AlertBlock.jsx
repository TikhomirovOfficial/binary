import React from 'react';
import {Link} from "react-router-dom";
import {SUPPORT_LINK} from "../config/cfg";

const AlertBlock = ({alertText}) => {
    return (
        <div>
            <h1 style={{marginBottom: 30}} className={"alertText txt-center"}>{alertText ? alertText : "Бот приостановлен, обратитесь в тех. поддержку"}</h1>
            <div className="d-f js-between gap-30">
                <Link to={'/'}>
                    Личный кабинет
                </Link>
                <a className="help" target="_blank" href={SUPPORT_LINK}>Обратиться в поддержку</a>
            </div>
        </div>
    );
};

export default AlertBlock;