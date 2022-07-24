import React, {useState} from 'react';
import useInput from "../hooks/useInput";
import Api from "../http/requests";

const ControlUserItem = ({onDelete, id, login, brokers, subscribe}) => {

    const [subDays, changeDays] = useInput()
    const [subHours, changeHours] = useInput()
    const [brokersMenu, setBrokersMenu] = useState(false)
    const [brokerState, setBrokerState] = useState(brokers || [])
    const [brokerName, changeBrokerName] = useInput("")
    const [sbChanged, setSbChanged] = useState(false)

    const buttonDisabled = Number(subDays) < 0 || Number(subHours) < 0 || (!Number(subDays) && !Number(subHours))

    const deleteUser = async () => {
        onDelete(id)
        await Api.destroy({id})
    }
    const handleBrokersMenu = () => {
        setBrokersMenu(!brokersMenu)
    }
    const addBroker = () => {
        if (!brokerState.some(brokerItem => brokerItem === brokerName)) {
            setBrokerState([...brokerState, brokerName])
        }
    }
    const deleteBroker = (brokerItem) => {
        setBrokerState(brokerState.filter(broker => broker !== brokerItem))
    }
    const sendBrokers = async () => {
        await Api.changeBrokers({
            id,
            brokers: brokerState
        }).then(() => {
            handleBrokersMenu()
        })
    }
    const sendChangeSubscribe = async() => {
        const subDate = new Date(subscribe)
        if(Number(subDays)) {
            subDate.setDate(subDate.getDate() + Number(subDays));
        }
        subDate.setTime(subDate.getTime() + Number(subHours)*1000*3600)
        const resultSubscribe = new Date(subDate).toISOString()
        await Api.changeSubscribe({
            id,
            subscribe: resultSubscribe
        }).then(() => {
            setSbChanged(true)
        }).then(() => {
            setTimeout(() => {
                setSbChanged(false)
            }, 1000)
        })
    }
    const resetSubscribe = async() => {
        await Api.changeSubscribe({
            id,
            subscribe: new Date().toISOString()
        })
    }

    return (
        <div className="user-item flex-column">
            <div className="flex-row-betw">
                <h2 className="fw-5">{login}</h2>
                <h2 onClick={resetSubscribe} className="fw-5" style={{color: 'orange'}}>Обнулить подписку</h2>
            </div>
            <div style={{background: "green", width: 100, padding: 10}} className="p-rel txt-center c-white">
                <div onClick={handleBrokersMenu}>
                    Брокеры
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
                            <div onClick={sendBrokers} className="brokersSave">Сохранить</div>
                        </div> : null
                }
            </div>
            <div className="flex-row-betw">
                <div className="d-f al-center gap-20">
                    <p>Продлить подписку на</p>
                    <div className="d-f subscribeInputs al-center">
                        <input value={subDays} onChange={changeDays} type="number" placeholder="Дни"/>
                        <input value={subHours} onChange={changeHours} type="number" placeholder="Часы"/>
                    </div>
                    {
                        sbChanged ? <button className="btn" style={{background: "green", color: "white"}}>
                            Продлено
                        </button> : <button onClick={sendChangeSubscribe} className="btn" style={{background: "blue", color: "white"}} disabled={buttonDisabled}>
                            Принять
                        </button>
                    }

                </div>
                <h2 onClick={deleteUser} className="fw-5" style={{color: "red"}}>
                    Удалить
                </h2>
            </div>
        </div>
    );
};

export default ControlUserItem;