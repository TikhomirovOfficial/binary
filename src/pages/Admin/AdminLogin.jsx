import React from 'react';
import WrapperForm from "../../components/WrapperForm";
import WrapperBlock from "../../components/WrapperBlock";

const AdminLogin = () => {
    return (
        <WrapperBlock>
            <div className="flex-column">
                <WrapperForm>
                    <div className="flex-column gap-30">
                        <h1 className="fw-5">
                            Вход в Админ-панель
                        </h1>
                        <input className="inputForm" type="text" placeholder={"Логин"}/>
                        <input className="inputForm" type="password" placeholder={"Пароль"}/>
                        <button className="btn c-white" style={{background: '#3B54D3'}}>
                            Вход
                        </button>
                        <p className="errorForm txt-center"></p>
                    </div>
                </WrapperForm>
            </div>

        </WrapperBlock>
    );
};

export default AdminLogin;