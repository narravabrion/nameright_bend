const AdminJS = require("adminjs")
const AdminJSExpress = require("@adminjs/express")
const AdminJSMongoose = require("@adminjs/mongoose")
const bcrypt = require("bcrypt")

const { User } = require("../models/user.model")
const { Name } = require("../models/name.model")
const { Token } = require("../models/token.model")

AdminJS.registerAdapter(AdminJSMongoose)

const adminJs = new AdminJS({
	databases: [],
	resources: [User, Name, Token],
	rootPath: "/admin",
	branding: {
		companyName: "Exp Admin",
		logo: false,
		softwareBrothers: false,
	},
})

//   const router = AdminJSExpress.buildRouter(adminJs)
const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
	authenticate: async (email, password) => {
		const user = await User.findOne({ email })
		if (user) {
			const matched = await bcrypt.compare(password, user.password)
			if (matched) {
				return user
			}
		}
		return false
	},
	cookiePassword: "some-secret-password-used-to-secure-cookie",
})

module.exports = {
	adminJs,
	router,
}
