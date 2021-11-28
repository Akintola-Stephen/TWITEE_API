require("dotenv")
const User = require('../model/User')
const { StatusCodes } = require('http-status-codes')
const BadRequest = require('../errors/bad-request')
const unAthenticated = require('../errors/unAuthenticated')


const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.getName(), email: user.getEmail() }, token })
}


const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
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

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}


module.export = {
  register,
  login,
}