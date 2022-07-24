import React, {useState} from 'react';
import WrapperBlock from "../components/WrapperBlock";
import WrapperForm from "../components/WrapperForm";
import useInput from "../hooks/useInput";
import Api from "../http/requests";


const Login = () => {
    const [password, changePassword] = useInput("")
    const [login, changeLogin] = useInput("")
    const [error, setError] = useState("")
    const sendLogin = () => {
        Api.login({login, password}).then(({data}) => {
            if(data.accessToken) {
                window.location.href = "/"
            }
        }).catch(e => {
            setError(e.message)
        })


    }
    return (
        <WrapperBlock>
            <div className="flex-column">
                <WrapperForm>
                    <div className="flex-column gap-30">
                        <h1 className="fw-5">
                            Авторизация бота
                        </h1>
                        <input onChange={changeLogin} value={login} className="inputForm" type="text"
                               placeholder={"Логин"}/>
                        <input onChange={changePassword} value={password} className="inputForm" type="password"
                               placeholder={"Пароль"}/>
                        <button onClick={sendLogin} className="btn c-white" style={{background: '#484848'}}>
                            Вход
                        </button>
                        <p className="errorForm txt-center">{error ? error : ""}</p>
                    </div>
                </WrapperForm>
                <a className="help" href="#">Обратиться в поддержку</a>
            </div>

        </WrapperBlock>
    );
};

export default Login;