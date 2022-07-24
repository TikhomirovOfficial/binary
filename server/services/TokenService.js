const jwt = require("jsonwebtoken")
const {Token} = require('../models')

class TokenService {
    generateTokens(payload) {

        const accessToken = jwt.sign({...payload}, process.env.ACCESS_TOKEN_KEY, {expiresIn: "30m"})
        const refreshToken = jwt.sign({...payload}, process.env.REFRESH_TOKEN_KEY, {expiresIn: "30d"})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(user_id, refreshToken) {
        const tokenData = await Token.findOne({where: {user_id: user_id}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        return await Token.create({
            user_id: user_id,
            refreshToken: refreshToken
        })
    }

    async deleteToken(refreshToken) {
        return await Token.destroy({where: {refreshToken: refreshToken}})
    }

    verifyAccessToken(token) {
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        } catch (e) {
            console.log(e);
            return null
        }
    }

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_TOKEN_KEY)
        } catch (e) {
            return null
        }
    }

    async tokenIsExists(token) {
        return await Token.findOne({where: {refreshToken: token}})
    }

}

module.exports = new TokenService()