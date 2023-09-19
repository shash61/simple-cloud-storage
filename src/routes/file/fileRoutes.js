const express = require('express')
const router = express.Router()
const {upload} = require('../../controllers/file/fileController')

router.post('/upload', upload)

module.exports = router