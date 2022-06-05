const moment = require("moment")
const jwt = require('jsonwebtoken')
const Token  = require("../models/token.model")
const {tokenTypes} = require('../config/token')

const generateToken = (
	userId,
	expires,
	type,
	secret = process.env.JWT_SECRET
) => {
	const payload = {
		sub: userId,
		iat: moment().unix(),
		exp: expires.unix(),
		type,
	}
	return jwt.sign(payload, secret)
}

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
	const tkn = await Token.create({
		token,
		user: userId,
		expires: expires.toDate(),
		type,
		blacklisted,
	})
	return tkn
}

const verifyToken = async (token, type) => {
	const payload = jwt.verify(token, process.env.JWT_SECRET)
	const tkn = await Token.findOne({
		token,
		type,
		user: payload.sub,
		blacklisted: false,
	})
	if (!tkn) {
		throw new Error("Token not found")
	}
	return tkn
}

const generateAuthTokens = async (user) => {
	const accessTokenExpires = moment().add(
		process.env.JWT_ACCESS_EXPIRATION_MINUTES,
		"minutes"
	)
	const accessToken = generateToken(
		user.id,
		accessTokenExpires,
		tokenTypes.ACCESS
	)

	const refreshTokenExpires = moment().add(
		process.env.JWT_REFRESH_EXPIRATION_DAYS,
		"days"
	)
	const refreshToken = generateToken(
		user.id,
		refreshTokenExpires,
		tokenTypes.REFRESH
	)
	await saveToken(
		refreshToken,
		user.id,
		refreshTokenExpires,
		tokenTypes.REFRESH
	)
	
	return {
		access: {
			token: accessToken,
			expires: accessTokenExpires.toDate(),
		},
		refresh: {
			token: refreshToken,
			expires: refreshTokenExpires.toDate(),
		},
	}
}


module.exports = {
	generateAuthTokens,verifyToken
}