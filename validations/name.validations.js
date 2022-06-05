const Joi = require("joi")
const { objectId } = require("./custom.validations")

const createName = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		origin_country: Joi.string().required(),
		religion: Joi.string().required(),
		origin_year: Joi.string().required().length(4),
		meaning: Joi.string().required(),
		gender: Joi.string().required(),
	}),
}

// const getNames = {
// 	query: Joi.object().keys({
// 		name: Joi.string(),
// 		role: Joi.string(),
// 		sortBy: Joi.string(),
// 		limit: Joi.number().integer(),
// 		page: Joi.number().integer(),
// 	}),
// }

const getName = {
	params: Joi.object().keys({
		id: Joi.string().custom(objectId),
	}),
}
const getNameByName = {
	params: Joi.object().keys({
		name: Joi.string(),
	}),
}

const updateName = {
	params: Joi.object().keys({
		id: Joi.required().custom(objectId),
	}),
	body: Joi.object()
		.keys({
			name: Joi.string(),
			origin_country: Joi.string(),
			religion: Joi.string(),
			origin_year: Joi.string().length(4),
			meaning: Joi.string(),
			gender: Joi.string(),
		})
		.min(1),
}

const deleteName = {
	params: Joi.object().keys({
		id: Joi.string().custom(objectId),
	}),
}
const upvoteName = {
	params: Joi.object().keys({
		id: Joi.string().custom(objectId),
	}),
}

module.exports = {
	createName,
	getName,
	getNameByName,
	updateName,
	deleteName,
    upvoteName
}
