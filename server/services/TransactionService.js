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
    async changeMessage(data) {
        if (!data.uid) {
            throw ApiError.BadRequest("Некорректный uid")
        }
        const transaction = await Transaction.findOne({where: {uid: data.uid}})
        if(!transaction) {
            throw ApiError.BadRequest("Торг с таким id не найден")
        }
        return await transaction.update({message: data.message})
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
    async changeDealAll(deal) {
        return await Transaction.findAll().then((res) => {
            res.every((transaction) => {
                transaction.update(deal)
            })
        })
        //return Transaction.update({deal: true});
    }

    async deleteTransaction(uid) {
        const transaction = await Transaction.destroy({where: {uid}})
        if(!transaction) {
            throw ApiError.BadRequest("Некорректный uid")
        }
        return transaction
    }
}

module.exports = new TransactionService()
