const Joi = require("joi")
const { password,objectId} = require("./custom.validation")

const createUser = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().required().custom(password),
	}),
}

// const getUsers = {
// 	query: Joi.object().keys({
// 		name: Joi.string(),
// 		role: Joi.string(),
// 		sortBy: Joi.string(),
// 		limit: Joi.number().integer(),
// 		page: Joi.number().integer(),
// 	}),
// }

const getUser = {
	params: Joi.object().keys({
		id: Joi.string().custom(objectId),
	}),
}

const updateUser = {
	params: Joi.object().keys({
		id: Joi.required().custom(objectId),
	}),
	body: Joi.object()
		.keys({
			name: Joi.string(),
			email: Joi.string().email(),
			password: Joi.string().custom(password),
		})
		.min(1),
}

const deleteUser = {
	params: Joi.object().keys({
		id: Joi.string().custom(objectId),
	}),
}

module.exports = {
	createUser,
	getUser,
	updateUser,
	deleteUser,
}
