require("dotenv")
const User = require('../model/User')
const { StatusCodes } = require('http-status-codes')
const BadRequest = require('../errors/bad-request')
const unAthenticated = require('../errors/unAuthenticated')


exports.register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.getName(), email: user.getEmail() }, token })
}



exports.login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequest('Please provide email and password', 400)
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new unAthenticated('Invalid Credentials')
  }

  // Password Comparison
  const passwordVerify = await user.comparePassword(password)
  if (!passwordVerify) {
    throw new unAthenticated('Invalid Credentials')
  }

  //  Compare Password
  const token = user.createJWT()
  return res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

