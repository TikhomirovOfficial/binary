const TransactionService = require("../services/TransactionService");
const UserService = require("../services/UserService");


class AuctionController {
    async joinUser(req, res, next) {
        try {
            const userAuctionData = req.body
            const transactionData = await TransactionService.registerTransaction(userAuctionData)
            return res.json(transactionData)
        } catch (e) {
            next(e)
        }
    }
    async getUsers(req, res) {
        const auctionUsers = await TransactionService.getAllUsers()
        const users = await UserService.getAllUsers()
        return res.json({
            users,
            auctionUsers
        })
    }
    async getByUserId(req, res, next) {
        try {
            const uid = req.user.id
            const transactionFinded = await TransactionService.getById(uid)
            return res.json(transactionFinded)
        } catch (e) {
            next(e)
        }

    }
    async changeDeal(req, res, next) {
        try {
            const data = req.body
            const changed = await TransactionService.changeDeal(data)
            return res.json(changed)
        } catch (e) {
            next(e)
        }
    }
    async changeDealAll(req, res, next) {
        try {
            const deal = req.body
            const changed = await TransactionService.changeDealAll(deal)
            return res.json(deal)
        } catch (e) {
            next(e)
        }
    }
    async changeMessage(req, res, next) {
        try {
            const data = req.body
            const changed = await TransactionService.changeMessage(data)
            return res.json(changed)
        } catch (e) {
            next(e)
        }
    }
    async destroy(req, res, next) {
        try {
            const {uid} = req.body
            console.log(req.body)
            const deletedTransaction = await TransactionService.deleteTransaction(uid)
            return res.json(deletedTransaction)

        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuctionController()