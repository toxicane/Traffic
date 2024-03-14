const Router = require('express').Router
const userController = require('../controllers/user-controller')
const router = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

router.post(
	'/registration',
	// body('email').isEmail(), //валидация почты
	// body('password').isLength({ min: 5, max: 32 }), //валидация пароля
	userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

module.exports = router