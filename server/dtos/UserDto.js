module.exports = class UserDto {
    id;
    login;
    admin;
    subscribe;
    brokers;
    message_stop;
    password;
    broker_access

    constructor(model) {
        this.id = model.id;
        this.broker_access = model.broker_access
        this.password = model.password
        this.message_stop = model.message_stop
        this.login = model.login
        this.admin = model.admin
        this.subscribe = model.subscribe
        this.brokers = model.brokers
    }
}