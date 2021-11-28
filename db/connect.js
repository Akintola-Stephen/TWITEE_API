const mongoose = require('mongoose');
require("dotenv")


const connect = (url) => {
  return mongoose.connect(process.env.MONGODB_CONNECTION_URI
  )
}

module.exports = connect