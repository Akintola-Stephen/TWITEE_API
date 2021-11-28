const unAthenticated = require('../errors/unAuthenticated')
const User = require('../model/User')
const jwt = require('jsonwebtoken')


const authenticationMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new unAthenticated('No token provided')
  }

  const token = authHeader.split('')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const user = User.findById(payload.id).select('-password')
    req.user = user

    req.user = { userId: payload.userId, email: payload.email }
    next()
  } catch (err) {
    throw new unAthenticated('Authentication invalid')
  }
}

module.exports = authenticationMiddleWare