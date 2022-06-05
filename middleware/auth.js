const jwt = require("jsonwebtoken")
const { StatusCodes } = require("http-status-codes")

const auth = (req, res, next) => {
	const token = req.headers["x-access-token"] || req.headers["authorization"]
	if (!token) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ error: "Authorization credentials missing" })
	}

	try {
		tkn = token.split(" ")[1]
		const decoded = jwt.verify(tkn, process.env.JWT_SECRET)
		req.user = decoded
		next()
	} catch (error) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid token" })
	}
}

module.exports = { auth }
