const ApiError = require("../exceptions/ApiError");

module.exports = (req, res, next) => {
    try {
        const user = req.user;
        console.log(user)
        if(!user.admin) {
            return next(ApiError.BadRequest('user is not admin'))
        }
        next()
    } catch (e) {
        return next(ApiError.BadRequest('admin error'))
    }

}