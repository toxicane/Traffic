const ApiError = require('../exceptions/api-error')

//middleware для обработки ошибок
module.exports = function (err, req, res, next) {
	console.log(err) //выводим ошибку в логи
	if (err instanceof ApiError) {
		//если объект ошибки является экземпляром класса ApiError, значит мы обработали эту ошибку
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors }) //в таком случае в ответе передаём статус ошибки, её текст и массив ошибок
	}
	return res.status(500).json({ message: 'Непредвиденная ошибка' }) //если мы такую ошибку не обработали, тогда возвращаем клиенту 500-ую ошибку
}
