const express = require('express')
const router = express.Router()
const { checkSchema } = require('express-validator')
const {upload} = require('../../controllers/file/fileController')
const { fileUploadSchema } = require('../../validation/fileSchema')
const processFile = require('../../config/multer')


router.post('/upload', processFile, upload)

module.exports = router