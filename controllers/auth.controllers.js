const { StatusCodes } = require("http-status-codes")
const { User } = require("../models/user.model")
const Token = require("../models/token.model")
const { tokenTypes } = require("../config/token")
const tokenService = require("../services/token.service")

const userLogin = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email })

		if (!user || !(await user.isPasswordMatch(req.body.password))) {
			res.status(StatusCodes.BAD_REQUEST).json({ error: "invalid credentials" })
		}
		if (user && (await user.isPasswordMatch(req.body.password))) {
			const token = await tokenService.generateAuthTokens(user)
			res.status(StatusCodes.OK).json({ user, token })
		}
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
}
const userLogout = async (req, res, next) => {
	try {
		const refreshToken = await Token.findOne({
			token: req.body.refreshToken,
			type: tokenTypes.REFRESH,
			blacklisted: false,
		})
		if (!refreshToken) {
			res.status(StatusCodes.NOT_FOUND).json({ error: "token not found" })
		} else {
			await refreshToken.remove()
			res.status(StatusCodes.OK).json({ message: "logged out" })
		}
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
}

const refreshToken = async (req, res, next) => {
	try {
		const tkn = await Token.findOne({
			token: req.body.refreshToken,
			type: tokenTypes.REFRESH,
			blacklisted: false,
		})
		if (!tkn) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ error: "missing valid credentials" })
		}
		console.log(tkn)
		const user = await User.findOne({ id: tkn.user })
		console.log(user)
		if (!user) {
			res.status(StatusCodes.UNAUTHORIZED).json({ error: "invalid user" })
		}
		if (tkn && user) {
			await tkn.remove()
			const token = await tokenService.generateAuthTokens(user)
			res.status(StatusCodes.OK).json({ ...token })
		}
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
}

module.exports = {
	userLogin,
	userLogout,
	refreshToken,
}
