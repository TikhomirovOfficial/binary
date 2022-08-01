const {User, Transaction} = require("../models")
const tokenService = require('./TokenService')
const userDto = require('../dtos/UserDto')
const ApiError = require("../exceptions/ApiError");


class UserService {
    async registration(user) {
        const userCandidate = await User.findOne({where: {login: user.login}});
        if (userCandidate) {
            throw ApiError.BadRequest(`Пользователь с логином ${user.login} существует.`)
        }
        if (user.login && user.password) {
            const userCreated = await User.create({
                login: user.login,
                password: user.password,
                subscribe: user.subscribe,
                broker_access: user.broker_access,
                admin: user.admin,
                brokers: user.brokers
            });
            const userData = new userDto(userCreated)

            return {
                ...userData,
            }
        }
        throw ApiError.BadRequest("Отсутсвуют необходимые поля!")
    };

    async deleteUser(uid) {

        const userDeleted = await User.destroy({where: {id: uid}})
        return userDeleted
    }

    async changeSubscribe(uid, subscribe) {
        const user = await User.findOne({where: {id: uid}})
        if (!user) {
            throw ApiError.BadRequest("Пользователь не найден")
        }
        return await user.update({subscribe: subscribe})
    }

    async changeBrokers(uid, brokers) {
        const user = await User.findOne({where: {id: uid}})
        if (!user) {
            throw ApiError.BadRequest("Пользователь не найден")
        }
        return await user.update({brokers: brokers})
    }

    async login(login, password) {
        const user = await User.findOne({where: {login: login}})
        console.log(login)
        if (!user) {
            throw ApiError.BadRequest("Пользователя с таким логином не существует")
        }
        const isPassEquals = password === user.password
        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверный пароль")
        }
        const userData = new userDto(user)
        const tokens = tokenService.generateTokens(userData)
        await tokenService.saveToken(userData.id, tokens.refreshToken)

        return {
            ...userData,
            ...tokens
        }
    }
    async changeMessageStopAll(message) {
        try {
            const updated = await User.update({
                message_stop: message,
                subscribe: new Date().toISOString()
            }, {where: {admin: false}})
            if(updated) {
                await Transaction.destroy({where: {}})
            }
            return message

        } catch (e) {
            throw new Error(e.message)
        }

    }
    async getAllUsers() {
        return await User.findAll({where: {admin: false}})
    }
    async changeMessageStop(data) {
        return User.update({message_stop: data.message}, {where: {id: data.id}});
    }

    async refresh(token) {
        if (!token) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.verifyRefreshToken(token)
        const tokenExists = tokenService.tokenIsExists(token)

        if (!userData || !tokenExists) {
            throw ApiError.UnauthorizedError()
        }

        const user = await User.findOne({where: {id: userData.id}})
        if (user) {
            const userDTO = new userDto(user)
            const tokens = tokenService.generateTokens(userDTO)
            await tokenService.saveToken(userData.id, tokens.refreshToken)

            return {
                ...userDTO,
                ...tokens
            }
        }
        throw ApiError.BadRequest("Пользователь не найден")
    }

    async logout(token) {
        if (!token) {
            throw ApiError.UnauthorizedError()
        }
        return tokenService.deleteToken(token)
    }
    async getById(uid) {
        if (!uid) {
            throw ApiError.BadRequest("Некорректный id")
        }
        const userData = await User.findOne({where: {id: uid}})
        return new userDto(userData)
    }
}

module.exports = new UserService()
