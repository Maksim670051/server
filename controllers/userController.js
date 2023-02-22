const UserService = require('./../service/userService')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError')

class UserController {

    async register(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            const { email, password } = req.body
            const UserData = await UserService.register(email, password)
            res.cookie('refreshToken', UserData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
            return res.json(UserData)
        }
        catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {

        }
        catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {

        }
        catch (error) {
            next(error)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await UserService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        }
        catch (error) {
            next(error)
        }
    }

    async refresh(req, res, next) {
        try {

        }
        catch (error) {
            next(error)
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(['124', '456'])
        }
        catch (error) {
            next(error)
        }
    }

}

module.exports = new UserController()