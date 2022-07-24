module.exports = class UserDto {
    id;
    login;
    admin;
    subscribe;
    brokers

    constructor(model) {
        this.id = model.id;
        this.login = model.login
        this.admin = model.admin
        this.subscribe = model.subscribe
        this.brokers = model.brokers
    }
}