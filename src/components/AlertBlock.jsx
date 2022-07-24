import React from 'react';

const AlertBlock = ({alertText = "Бот приостановлен."}) => {
    return (
        <div>
            <h1 className={"alertText"}>{alertText}</h1>
            <a href="" className="help d-b ml-auto">Обратиться в тех.поддержку</a>
        </div>
    );
};

export default AlertBlock;