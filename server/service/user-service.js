const bcrypt = require('bcrypt')
const tokenService = require('./token-service')

const UserModel = require('../models/user-model')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

async function generateTokensAndSave(user) {
	const userDto = new UserDto(user) //вычленяем из объекта нужные поля (email, name)
	const tokens = tokenService.generateTokens({ ...userDto }) //генерируем токены
	await tokenService.saveToken(userDto.id, tokens.refreshToken) //сохраняем refresh-токен в БД
	return {
		...tokens,
	} //из функции возвращаем 2 токена с данными пользователя (email, id)
}

class UserService {
	async registration(email, name, password) {
		const candidate = await UserModel.findOne({ email }) //ищем пользователя с такой почтой
		if (candidate) {
			throw ApiError.BadRequest(
				`Пользователь с почтовым адресом ${email} уже существует.`
			)
		} //если нашли, выкидываем ошибку

		const hashPassword = await bcrypt.hash(password, 3) //хешируем пароль
		const user = await UserModel.create({ email, name, password: hashPassword }) //создаём в БД пользователя с такой почтой и захешированным паролем, возвращаем созданный объект с данными пользователя и записываем его в user

		const tokens = await generateTokensAndSave(user) //генерируем токены, сохраняем refresh-токен в БД, возвращаем токены с данными пользователя (email, id)
		return tokens
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email }) //ищем пользователя с такой почтой
		if (!user) {
			throw ApiError.BadRequest(
				`Пользователь с почтовым адресом ${email} не найден.`
			)
		} //если не нашли выкидываем ошибку

		const isPassEquals = await bcrypt.compare(password, user.password) //сверяем введённый пароль с паролем в БД
		if (!isPassEquals) {
			throw ApiError.BadRequest(`Неверный пароль.`)
		} //если не совпали, то выкидываем ошибку

		const tokens = await generateTokensAndSave(user) //генерируем токены, сохраняем refresh-токен в БД, возвращаем токены с данными пользователя (email, id)
		return tokens
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken) //удаляем токен из БД
		return token
	}

	//функция перезаписи токенов
	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		} //если токена нет, то пользователь не авторизован

		const userData = tokenService.validateRefreshToken(refreshToken) //проверяем токен на валидность
		const tokenFromDB = await tokenService.findToken(refreshToken) //ищем токен в БД
		if (!userData || !tokenFromDB) {
			throw ApiError.UnauthorizedError()
		} //если токен не валиден или его нет в БД, то пользователь не авторизован

		const user = await UserModel.findById(userData.id) //достаём актуальные данные пользователя из БД
		const tokens = await generateTokensAndSave(user) //генерируем токены, сохраняем refresh-токен в БД, возвращаем токены с данными пользователя (email, id)
		return tokens
	}

	async getAllUsers() {
		const users = await UserModel.find()
		return users
	}
}

module.exports = new UserService()
