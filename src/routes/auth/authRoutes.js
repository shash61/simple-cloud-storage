const express = require('express')
const { login, signUp } = require('../../controllers/auth/authController')
const { checkSchema } = require('express-validator')
const { signUpSchema, loginSchema } = require('../../validation/authSchema')
const router = express.Router()


router.post('/register', checkSchema(signUpSchema), signUp)
router.post('/login', checkSchema(loginSchema), login)


module.exports = router