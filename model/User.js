const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  // name: String,
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlenght: 3,
    maxlength: 50,
  },

  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlenght: 6,
    maxlength: 12,
  },

  date_created: { type: Date, default: Date.now },
})

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

userSchema.methods.getName = function () {
  return this.name
}



userSchema.methods.getEmail = function () {
  return this.email
}

userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', userSchema)


