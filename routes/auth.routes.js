const express = require('express')
const authControllers = require('../controllers/auth.controllers')

const router = express.Router()

router.post('/login',authControllers.userLogin)
router.post('/logout',authControllers.userLogout)
router.post('/token/refresh',authControllers.refreshToken)

module.exports = router