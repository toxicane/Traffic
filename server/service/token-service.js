const jwt = require('jsonwebtoken')
const TokenModel = require('../models/token-model')
const tokenModel = require('../models/token-model')

class TokenService {
	//функция создания токенов
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '30s',
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '30d',
		})
		return {
			accessToken,
			refreshToken,
		}
	}

	//валидация access-токена
	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	//валидация refresh-токена
	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	//функция добавления/обновления refresh токена в БД
	async saveToken(userId, refreshToken) {
		const tokenData = await TokenModel.findOne({ user: userId }) //ищем запись в таблице с токенами по userId
		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return tokenData.save()
		} //если у пользователя есть сохранённый токен, тогда мы обновляем поле с токеном и сохраняем запись в БД
		const token = await TokenModel.create({ user: userId, refreshToken }) //если у пользователя нет токена, тогда мы добавляем новую запись в БД
		return token
	}

	//удаление токена из БД
	async removeToken(refreshToken) {
		const tokenData = await tokenModel.deleteOne({ refreshToken })
		return tokenData
	}

	//поиск токена в БД
	async findToken(refreshToken) {
		const tokenData = await tokenModel.findOne({ refreshToken })
		return tokenData
	}
}

module.exports = new TokenService()
