module.exports = class UserDto {
	email
	id

	constructor(model) {
		this.id = model._id
		this.email = model.email
		this.name = model.name
	}
}
