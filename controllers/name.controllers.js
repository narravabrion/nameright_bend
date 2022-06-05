const { StatusCodes } = require("http-status-codes")
const { Name } = require("../models/name.model")

const createName = async (req, res, next) => {
	const name = await Name.findOne({ name: req.body.name.trim().toLowerCase() })
	if (name) {
		return res.status(StatusCodes.CONFLICT).json({ error: "name already exists" })
	}
	try {
		await Name.create(req.body)
		res.status(StatusCodes.OK).json({ message: "name created successfully" })
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
}

const getAllNames = async (req, res, next) => {
	try {
		
		const names = await Name.find().limit(+req.query?.limit)
		
		res.status(StatusCodes.OK).json(names)
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
}
const getNameById = async (req, res, next) => {
	try {
		const name = await Name.findById(req.params.id)
		if (!name) {
			return res.status(StatusCodes.NOT_FOUND).json({ error: "name not found" })
		}
		res.status(StatusCodes.OK).json(name)
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
}
const getNameByName = async (req, res, next) => {
	try {
		const name = await Name.findOne({name:req.params.name})
		if (!name) {
			return res.status(StatusCodes.NOT_FOUND).json({ error: "name not found" })
		}
		res.status(StatusCodes.OK).json(name)
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
}
const deleteNameById = async (req, res, next) => {
	try {
		const name = await Name.findById(req.params.id)
		if (!name) {
			return res.status(StatusCodes.NOT_FOUND).json({ error: "name not found" })
		}
		await Name.findByIdAndDelete(req.params.id)
		res.status(StatusCodes.OK).send({ message: "name successfully deleted" })
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
}
const updateNameById = async (req, res, next) => {
	try {
		await Name.findByIdAndUpdate(req.params.id, req.body)
		res.status(StatusCodes.OK).send({ message: "name successfully updated" })
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
	}
}

const updateNameVote = async (req, res, next) => {
	try {
		const name = await Name.findById(req.params.id)
		if (!name) {
			return res.status(StatusCodes.NOT_FOUND).json({ error: "name not found" })
		}
		await name.updateOne({ votes: name.votes + 1 })
		res.status(StatusCodes.OK).send({ message: "cheers🥂" })
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
}
const updateNameUnVote = async (req, res, next) => {
	try {
		const name = await Name.findById(req.params.id)
		if (!name) {
			return res.status(StatusCodes.NOT_FOUND).json({ error: "name not found" })
		}
		await name.updateOne({ votes: name.votes - 1 })
		res.status(StatusCodes.OK).send({ message: "cheers🥂" })
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
}

module.exports = {
	createName,
	getAllNames,
	getNameById,
	getNameByName,
	deleteNameById,
	updateNameById,
	updateNameVote,
	updateNameUnVote
}
