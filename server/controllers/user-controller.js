const ApiError = require('../exceptions/api-error')
const userService = require('../service/user-service')
const { validationResult } = require('express-validator')
//в случае возникновения ошибок в контроллерах, передаём управление в middleware для обработки ошибок с помощью next(e)

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
			}

			const { email, name, password } = req.body //забираем данные из тела запроса
			const userData = await userService.registration(email, name, password) //передаём данные в функцию registration
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			}) //отправляем куку с refresh-токеном
			return res.json(userData) // возвращаем клиенту данные пользователя и токены
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const userData = await userService.login(email, password)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			}) //отправляем куку с refresh-токеном
			return res.json(userData) // возвращаем клиенту данные пользователя и токены
		} catch (e) {
			next(e)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies //достаём refresh-токен из куки
			if (!refreshToken) {
				throw ApiError.BadRequest('Отсутствует refresh-токен.')
			}
			const token = await userService.logout(refreshToken) //удаляем токен из БД
			res.clearCookie('refreshToken') //удаляем токен из куки
			return res.json(token)
		} catch (e) {
			next(e)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies //достаём refresh-токен из куки
			const userData = await userService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			}) //отправляем куку с refresh-токеном
			return res.json(userData) // возвращаем клиенту данные пользователя и токены
		} catch (e) {
			next(e)
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers()
			return res.json(users)
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new UserController()
