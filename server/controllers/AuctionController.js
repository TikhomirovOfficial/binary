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
}

module.exports = new AuctionController()