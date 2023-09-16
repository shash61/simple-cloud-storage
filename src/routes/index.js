const express = require('express')
const router = express.Router()
const authRoutes = require('./auth/authRoutes')
const fileRoutes = require('./file/fileRoutes')
const {validAuth}= require('../middlewares')

router.get('/', (req,res)=>{
  console.log('rooot route')
})

router.use('/auth', authRoutes)
router.use('/file', validAuth, fileRoutes)

module.exports = router