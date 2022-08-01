import React, {useState} from 'react';
import WrapperForm from "./WrapperForm";
import useInput from "../hooks/useInput";
import Api from "../http/requests";

const CreateUser = ({handleForm}) => {
    const [subDays, changeDays] = useInput()
    const [subHours, changeHours] = useInput()
    const [login, changeLogin] = useInput("")
    const [password, changePassword] = useInput("")
    const [brokerState, setBrokerState] = useState([])
    const [brokerName, changeBrokerName] = useInput("")
    const [brokersMenu, setBrokersMenu] = useState(false)
    const [created, setCreated] = useState(false)
    const [brokerAccess, changeBrokerAccess] = useInput(false)
    const buttonDisabled = (Number(subDays) < 1 && Number(subHours) < 1) || login.length < 1 || password.length < 1 || brokerState.length < 1

    const handleBrokersMenu = () => {
        setBrokersMenu(!brokersMenu)
    }
    const getSubscribe = () => {
        const subDate = new Date()
        if (Number(subDays)) {
            subDate.setDate(subDate.getDate() + Number(subDays));
        }
        subDate.setTime(subDate.getTime() + Number(subHours) * 1000 * 3600)
        const resultSubscribe = new Date(subDate).toISOString()
        return resultSubscribe

    }
    const addBroker = () => {
        if (!brokerState.some(brokerItem => brokerItem === brokerName)) {
            setBrokerState([...brokerState, brokerName])
        }
    }
    const deleteBroker = (brokerItem) => {
        setBrokerState(brokerState.filter(broker => broker !== brokerItem))
    }
    const register = async () => {
        const userData = {
            login,
            password,
            broker_access: brokerAccess,
            subscribe: getSubscribe(),
            brokers: brokerState
        }
        await Api.registration(userData).then((res) => {
            console.log(res)
            setCreated(true)
        }).then(() => {
            setTimeout(() => {
                setCreated(false)
                window.location.reload()
            }, 1300)
        })

    }

    return (
        <div onClick={handleForm} className="w-100v h-100v f-center-col p-fix modal-create-user">
            <WrapperForm className="bg-white flex-column gap-30">
                {
                    !created ?
                        <>
                            <h2 className="fw-5">Создать пользователя</h2>
                            <div className="d-f inputWrapper al-center">
                                <input onChange={changeLogin} placeholder="Логин" type="text"/>

                            </div>
                            <div  className="d-f inputWrapper al-center">
                                <input onChange={changePassword} placeholder="Пароль" type="text"/>
                            </div>
                            <select onChange={changeBrokerAccess} className="inputWrapper">
                                <option value={false}>Демо-счет</option>
                                <option value={true}>Реальный счет</option>
                            </select>
                            <div style={{background: "green", width: 100, padding: 10}} className="p-rel txt-center c-white">
                                <div onClick={handleBrokersMenu}>
                                    {!brokersMenu ? "Брокеры": "Закрыть"}
                                </div>
                                {
                                    brokersMenu ?
                                        <div className="p-abs brokersMenu flex-column">
                                            {
                                                brokerState.length ?
                                                    <div className="brokerList">

                                                        {
                                                            brokerState.map(item => (
                                                                <div className="d-f brokerItem js-between gap-20 al-center">
                                                                    <h4 className="brokerName fw-5">{item}</h4>
                                                                    <div onClick={() => deleteBroker(item)}
                                                                         className="deleteBroker">Удалить
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }

                                                    </div> : <h4 className="c-black">Добавьте брокера</h4>
                                            }


                                            <div className="addBroker jc-center d-f al-center gap-15">
                                                <input value={brokerName} onChange={changeBrokerName} className="broker_input"
                                                       type="text"/>
                                                <button onClick={addBroker} className="btn broker_btn">+</button>
                                            </div>
                                        </div> : null
                                }
                            </div>
                            <div className="flex-column gap-20">
                                <h3 className="fw-5 ">Подписка</h3>
                                <div className="d-f subscribeInputs">
                                    <input value={subDays} onChange={changeDays} type="number" placeholder="Дни"/>
                                    <input value={subHours} onChange={changeHours} type="number" placeholder="Часы"/>
                                </div>
                            </div>
                            <button onClick={register} disabled={buttonDisabled} className="inputGenerate">
                                Создать
                            </button>

                        </> :
                    <h2>Пользователь успешно создан</h2>

                }

            </WrapperForm>
        </div>
    );
};

export default CreateUser;