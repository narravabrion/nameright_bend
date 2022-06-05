var express = require("express")
var router = express.Router()
const nameController = require("../controllers/name.controllers")
const { validate } = require("../middleware/validate")
const nameValidations = require("../validations/name.validations")
const { auth } = require("../middleware/auth")
const {
	authorize,
	authorizeStaff,
	authorizeAdmin,
} = require("../middleware/authorize")

/* GET Names listing. */
router.get("/", nameController.getAllNames)
router.post(
	"/create",
	validate(nameValidations.createName),
	nameController.createName
)
router.get(
	"/:id",
	validate(nameValidations.getName),
	nameController.getNameById
)
router.get(
	"/value/:name",
	validate(nameValidations.getNameByName),
	nameController.getNameByName
)
router.delete(
	"/delete/:id",
	auth,
	authorizeStaff,
	validate(nameValidations.deleteName),
	nameController.deleteNameById
)
router.put(
	"/update/:id",
	auth,
	authorizeStaff,
	validate(nameValidations.updateName),
	nameController.updateNameById
)
router.put(
	"/upvote/:id",
	validate(nameValidations.upvoteName),
	nameController.updateNameVote
)
router.put(
	"/downVote/:id",
	validate(nameValidations.upvoteName),
	nameController.updateNameUnVote
)

module.exports = router
