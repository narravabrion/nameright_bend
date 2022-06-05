const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

const {adminJs,router} = require('./admin')
const { logger } = require("./middleware/logger")
const errorHandler = require("./middleware/errorHandler")


const usersRouter = require("./routes/user.routes")
const authRouter = require("./routes/auth.routes")
const nameRouter = require("./routes/name.routes")

const app = express()

// admin setup
app.use(errorHandler)
app.use(adminJs.options.rootPath, router)

app.use(morgan("dev"))
app.use(logger)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))


app.use("/api/v1/user", usersRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/name", nameRouter)



module.exports = app
