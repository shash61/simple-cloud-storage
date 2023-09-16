const express = require('express')
const app = express()
require('dotenv').config()
var morgan = require('morgan')
const dbConnect = require('./utility/dbconnect')
const routes = require('./routes')
require('../.sequelizerc')




app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


app.use('/api/v1', routes)

dbConnect()

app.listen(5500,()=>{
  console.log('server started')
})
