require('dotenv').config()
const express = require('express');
const conn = require('./db/connect')
const app = express()

app.use(express.json())

// Router Imports
const authRoute = require('./routes/auth')
const twitRoute = require('./routes/twit')

// Middleware Imports
const notFound = require('./middleware/notFound')
const errorHandlerMiddleWare = require('./middleware/errorHandler')
const authenticateUser = require('./middleware/auth')


app.use(express.json())


app.use('/api/user', authRoute)
app.use('/api/user', authenticateUser, twitRoute)


app.use(notFound)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await conn(process.env.MONGODB_CONNECTION_URI)
    app.listen(port, console.log(`Connected succesfully!!! App is listening on port ${port}`));
  }
  catch (err) {
    console.log(err)
  }
}

start()


