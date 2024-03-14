module.exports = class ApiError extends Error {
	//расширяем класс ошибки
	status
	errors

	constructor(status, message, errors) {
		super(message)
		this.status = status
		this.errors = errors
	}

	//создаём статические методы, которые будем вызывать в блоках catch
	static BadRequest(message, errors = []) {
		return new ApiError(400, message, errors)
	}

	static UnauthorizedError() {
		return new ApiError(401, 'Пользователь не авторизован')
	}
}
