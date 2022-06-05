const jwt = require("jsonwebtoken")
const Joi = require("joi")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 50,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 255,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			maxlength: 255,
		},
		isAdmin: { type: Boolean, default: false },
		isStaff: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
)

UserSchema.pre("save", async function (next) {
	const user = this
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8)
	}
	next()
})
UserSchema.methods.isPasswordMatch = async function (password) {
	const user = this
	return bcrypt.compare(password, user.password)
}
const User = mongoose.model("User", UserSchema)

//function to validate user
function validateUser(user) {
	const schema = {
		name: Joi.string().min(3).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(8).max(255).required(),
	}

	return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser
