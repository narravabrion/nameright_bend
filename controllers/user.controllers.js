const { StatusCodes } = require("http-status-codes")
const { User } = require("../models/user.model")

const registerUser = async (req, res, next) => {
	const currentUser = await User.findOne({ email: req.body.email })
	if (currentUser) {
		res.status(StatusCodes.CONFLICT).json({ error: "user already exists" })
	}
	try {
		await User.create(req.body)
		res
			.status(StatusCodes.CREATED)
			.send({ message: "user created successfully" })
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
	}
}

const getAllUsers = async (req, res, next) => {
	const users = await User.find()
	res.status(StatusCodes.OK).send(users)
}
const getUserById = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({ error: "user not found" })
		}
		res.status(StatusCodes.OK).send(user)
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
	}
}
const deleteUserById = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.params.id)
		res.status(StatusCodes.OK).send({ message: "user successfully deleted" })
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
	}
}
const updateUserById = async (req, res, next) => {
	try {
		await User.findByIdAndUpdate(req.params.id,req.body)	
		res.status(StatusCodes.OK).send({ message: "user successfully updated" })
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
	}
}

module.exports = {
	registerUser,
	getAllUsers,
	getUserById,
	deleteUserById,
	updateUserById,
}
