const connectToMongo = require('./db');
const dotenv = require("dotenv");

const express = require('express')
var app = express()

var cors = require('cors')

app.use(cors())

connectToMongo();

// const app = express()
const port = process.env.port;

app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`myNotebook backend listening at http://localhost:${port}`)
})