const { User } = require("../models/user.model")
const { StatusCodes } = require("http-status-codes")

const authorize = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.sub)
		if (
			!(req.params.id === req.user.sub && req.params.id === user.id) &&
			!user.isStaff &&
			!user.isAdmin
		) {
			return res
				.status(StatusCodes.FORBIDDEN)
				.json({ error: "authorization failed" })
		}
		next()
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: error.message })
	}
}
const authorizeAdmin = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.sub)
		if (!user.isAdmin) {
			return res
				.status(StatusCodes.FORBIDDEN)
				.json({ error: "authorization failed" })
		}
		next()
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: error.message })
	}
}
const authorizeStaff = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.sub)
		if (!user.isStaff) {
			return res
				.status(StatusCodes.FORBIDDEN)
				.json({ error: "authorization failed" })
		}
		next()
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: error.message })
	}
}

module.exports = { authorize, authorizeStaff, authorizeAdmin }
