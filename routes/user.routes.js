var express = require("express")
var router = express.Router()
const userConstroller = require("../controllers/user.controllers")
const { auth } = require("../middleware/auth")
const {
	authorize,
	authorizeStaff,
	authorizeAdmin,
} = require("../middleware/authorize")

/* GET users listing. */
router.get("/", auth, authorizeStaff, userConstroller.getAllUsers)
router.get("/:id", auth, authorize, userConstroller.getUserById)
router.post("/register", userConstroller.registerUser)
router.delete("/delete/:id", auth, authorize, userConstroller.deleteUserById)
router.put("/update/:id", auth, authorize, userConstroller.updateUserById)

module.exports = router
