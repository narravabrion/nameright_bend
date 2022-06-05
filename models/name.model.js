const Joi = require("joi")
const mongoose = require("mongoose")

const NameSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
            unique:true,
            lowercase:true,
		},
		origin_country: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		religion: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		origin_year: {
			type: String,
			required: true,
            length:4,
            trim:true,
		},
		meaning: {
			type: String,
			required: true,
			lowercase: true,
		},
		gender: {
			type: String,
			required: true,
		},
		votes: {
			type: Number,
            default:0,	
		},
	},
	{
		timestamps: true,
	}
)


const Name = mongoose.model("Name", NameSchema)

//function to validate name
function validateName(name) {
	const schema = {
		name: Joi.string().min(3).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(8).max(255).required(),
	}

	return Joi.validate(name, schema)
}

exports.Name = Name
exports.validate = validateName
