module.exports = class TransactionDto {
    id;
    uid;
    ip;
    phone;
    message;
    broker;
    broker_real;
    broker_login;
    broker_password;
    deal

    constructor({id, uid, message, ip, phone, broker_real, broker, broker_login, broker_password, deal = false}) {
        this.id = id;
        this.uid = uid;
        this.ip = ip;
        this.message = message
        this.phone = phone;
        this.broker_real = broker_real
        this.broker = broker
        this.broker_login = broker_login;
        this.broker_password = broker_password;
        this.deal = deal;
    }
}