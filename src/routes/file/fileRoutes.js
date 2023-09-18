const express = require('express')
const router = express.Router()
const { checkSchema } = require('express-validator')
const {upload} = require('../../controllers/file/fileController')
const { fileUploadSchema } = require('../../validation/fileSchema')


router.post('/upload', checkSchema(fileUploadSchema) ,upload)

module.exports = router