const bcrypt = require('bcrypt')
const uuid = require('uuid')
const UserModel = require('./../models/userModel')
const MailService = require('./mailService')
const TokenService = require('./tokenService')
const UserDto = require('./../dtos/userDto')
const ApiError = require('./../exceptions/apiError')

class UserService {

    async register(email, password) {
        const userDB = await UserModel.findOne({ email })
        if (userDB)
            throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существует`)
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await UserModel.create({ email, password: hashPassword, activationLink })
        // await MailService.sendActivationMail(email, `${process.env.SERVER_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = TokenService.generateToken({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink })
        if (!user)
            throw ApiError.BadRequest('Некорректная ссылка активации')
        user.isActivated = true
        await user.save()
    }

}

module.exports = new UserService()