module.exports = class TransactionDto {
    id;
    uid;
    ip;
    phone;
    broker;
    broker_login;
    broker_password;
    deal

    constructor({id, uid, ip, phone, broker, broker_login, broker_password, deal = false}) {
        this.id = id;
        this.uid = uid;
        this.ip = ip;
        this.phone = phone;
        this.broker = broker
        this.broker_login = broker_login;
        this.broker_password = broker_password;
        this.deal = deal;
    }
}