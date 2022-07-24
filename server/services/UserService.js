const {User} = require("../models")
const tokenService = require('./TokenService')
const userDto = require('../dtos/UserDto')
const ApiError = require("../exceptions/ApiError");
const bcrypt = require('bcrypt')


class UserService {
    async registration(user) {
        const userCandidate = await User.findOne({where: {login: user.login}});
        if (userCandidate) {
            throw ApiError.BadRequest(`Пользователь с логином ${user.login} существует.`)
        }
        if (user.login && user.password) {
            const hashPassword = await bcrypt.hash(String(user.password), 3)
            const userCreated = await User.create({
                login: user.login,
                password: hashPassword,
                subscribe: user.subscribe,
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
        const isPassEquals = await bcrypt.compare(password, user.password)
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

    async getAllUsers() {
        return await User.findAll({where: {admin: false}})
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
}

module.exports = new UserService()
