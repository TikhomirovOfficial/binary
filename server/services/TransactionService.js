const {User} = require("../models")

const ApiError = require("../exceptions/ApiError");
const {Transaction} = require("../models");
const TransactionDTO = require("../dtos/TransactionDto")


class TransactionService {
    async registerTransaction(data) {
        const createdTransaction = await Transaction.create(data)
        const TransactionDto = new TransactionDTO(createdTransaction)
        return {
            ...TransactionDto
        }
    }
    async getAllUsers() {
        return await Transaction.findAll()
    }
}

module.exports = new TransactionService()
