const UserService = require("../services/UserService")


class UserController {
    async registration (req, res, next) {
        try {
            const user = req.body
            const userData = await UserService.registration(user)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async login (req, res, next) {
        try {
            const {login, password} = req.body
            const userData = await UserService.login(login, password)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 1000*60*60*24*30, httpOnly: true})
            res.cookie("token", userData.accessToken, {maxAge: 1000*60*60*24*30})
            return res.json(userData)

        } catch (e) {
            next(e)
        }
    }
    async destroy (req, res, next) {
        try {
            const userId = req.body.id;
            return UserService.deleteUser(userId)
        } catch (e) {
            next(e)
        }
    }
    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)

        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await UserService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 1000*60*60*24*30, httpOnly: true})
            res.cookie("token", userData.accessToken, {maxAge: 1000*60*60*24*30})
            return res.json(userData)

        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        const users = await UserService.getAllUsers()
        res.json(users)
    }
    async changeUserSubscribe(req, res, next) {
        try {
            const {id, subscribe} = req.body
            const userChanged = await UserService.changeSubscribe(id, subscribe)
            return res.json(userChanged)
        }
        catch (e) {
            next(e)
        }
    }
    async changeUserBrokers(req, res, next) {
        try {
            const {id, brokers} = req.body
            const userChanged = await UserService.changeBrokers(id, brokers)
            return res.json(userChanged)
        }
        catch (e) {
            next(e)
        }
    }

}

module.exports = new UserController()