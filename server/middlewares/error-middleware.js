const ApiError = require("../exceptions/ApiError");
module.exports = (err, req, res, next) => {
    if (err instanceof ApiError) {
        console.log(err.message)
        return res.send({error:err.message, code: err.status})
    }
    console.log(err)
    return res.status(500).json({message: "Неизвестная ошибка"})
}