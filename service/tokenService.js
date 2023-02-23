const jwt = require('jsonwebtoken')
const TokenModel = require('./../models/tokenModel')

class TokenService {

    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30s' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await TokenModel.create({ user: userId, refreshToken })
        return token
    }

    async removeToken(refresh) {
        const tokenData = await TokenModel.deleteOne({ refresh })
        return tokenData
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        }
        catch (error) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        }
        catch (error) {
            return null
        }
    }

    async findToken(refresh) {
        const tokenData = TokenModel.findOne({ refresh })
        return tokenData
    }
}

module.exports = new TokenService()