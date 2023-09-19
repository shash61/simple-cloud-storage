const express = require('express')
const router = express.Router()
const authRoutes = require('./auth/authRoutes')
const fileRoutes = require('./file/fileRoutes')
const {validAuth}= require('../middlewares')

router.get('/', (req,res)=>{
  console.log('rooot route')
})

router.use('/v1/auth', authRoutes)
router.use('/v1/file', validAuth, fileRoutes)

module.exports = router