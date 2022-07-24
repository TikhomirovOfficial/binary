const ApiError = require("../exceptions/ApiError");
const tokenService = require("../services/TokenService")

module.exports = (req, res, next) => {
    try {
        const headerAuth = req.headers.authorization
        if (!headerAuth) {
            console.log(1);
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = headerAuth.split(' ')[1]
        if(!accessToken) {
            console.log(2);
            return next(ApiError.UnauthorizedError())
        }
        console.log(accessToken);
        const userData = tokenService.verifyAccessToken(accessToken)
        if (!userData) {
            console.log(3);
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }

}