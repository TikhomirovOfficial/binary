const {User} = require("../models")

const ApiError = require("../exceptions/ApiError");
const {Transaction} = require("../models");
const TransactionDTO = require("../dtos/TransactionDto")
const userDto = require("../dtos/UserDto");


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
    async getById(uid) {
        if (!uid) {
            throw ApiError.BadRequest("Некорректный id")
        }
        const userData = await Transaction.findOne({where: {uid}})
        if(!userData) {
            throw ApiError.BadRequest("Некорректный id")
        }
        return new TransactionDTO(userData)
    }
    async changeDeal(data) {
        if (!data.id) {
            throw ApiError.BadRequest("Некорректный id")
        }
        const transaction = await Transaction.findOne({where: {id: data.id}})
        if(!transaction) {
            throw ApiError.BadRequest("Некорректный id")
        }
        return await transaction.update({deal: data.deal})
    }
    async deleteTransaction(id) {
        return await Transaction.destroy({where: id})
    }
}

module.exports = new TransactionService()
