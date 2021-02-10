const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan('common'))
app.use(helmet())

mongoose.connect('mongodb://localhost:27017/pln', {
	useNewUrlParser: true, useUnifiedTopology: true
}, () => {
  console.log('database connected.')
})

app.use('/api/', require('./app/server.js'))

const port = 1300
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`)
})