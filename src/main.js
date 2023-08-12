const express = require('express')
const app = express()
require('dotenv').config()
const dbConnect = require('./dbconnect')

app.use(express.json())


dbConnect()

app.listen(5500,()=>{
  console.log('server started')
})
