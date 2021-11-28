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

// exports.register = async (req, res) => {
//   const found = await User.findOne({ email: req.body.email })
//   try {
//     if (found) {
//       return res.status(400).json({
//         success: false,
//         msg: 'User already exist with this email'
//       })
//     } else {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10)
//       const user = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: hashedPassword
//       })
//       user.save()
//         .then(user => {
//           jwt.sign(
//             { id: user.id },
//             process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: 3600 },
//             (err, token) => {
//               if (err) throw err

//               return res.status(201).json({
//                 token,
//                 success: true,
//                 data: user
//               })
//             }
//           )
//         })
//     }

//   } catch (err) {
//     return res.status(500).json({
//       sucess: false,
//       error: 'Server error'
//     })
//   }
// }


exports.login = async (req, res) => {
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
  return res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

