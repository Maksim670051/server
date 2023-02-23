const Router = require('express').Router
const UserController = require('./../controllers/userController')
const { body } = require('express-validator')
const AuthMiddleware = require('./../middlewares/authMiddleware')

const router = new Router()

router.post('/register', body('email').isEmail(), UserController.register)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)


router.get('/users', AuthMiddleware, UserController.getUsers)


module.exports = router