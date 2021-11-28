require("dotenv")
const asyncWrap = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')
const { BadRequest } = require('../errors/bad-request')
const { notFound } = require('../middleware/notFound')
const Twit = require('../model/Twit')


const createPost = asyncWrap(async (req, res) => {
  req.body.createdBy = req.user.userId
  const post = await Twit.create(req.body)
  res.status(StatusCodes.CREATED).json({ post })
})


const getAllPosts = asyncWrap(async (req, res) => {
  const posts = Twit.find({ createdBy: req.user.uderId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ posts, count: posts.length })
})


const commentToPost = asyncWrap(async (req, res) => {
  // res.send('Just posted a comment now!')
  const {
    body: { comment, like },
    user: { userId },
    params: { id: twitId }
  } = req

  if (comment === '' || like === '') {
    throw new BadRequest('Kindly comment or like on this post')
  }

  const post = Twit.findByIdAndUpdate({ _id: twitId, createdBy: userId }, req.body, { new: true, runValidators: true })
  if (!post) {
    throw new notFound(`No post with ID ${twitId}`)
  }
  res.status(StatusCodes.OK).json({ post })
})


const getTwit = asyncWrap(async (req, res, next) => {
  const { id: taskID } = req.params
  const twit = await Twit.findOne({ _id: taskID })
  if (!twit) {
    const error = new Error('Not Found')
    error.status = 404;
    return next(createCustomError(`No twit from id ${taskID}`))
  }
  res.status(200).json({ twit })
})


const deleteTwit = asyncWrap(async (req, res) => {
  const {
    user: { userId },
    params: { id: twitId }
  } = req

  const post = Twit.findByIdAndRemove({ _id: twitId, createdBy: userId })

  if (!post) {
    throw new notFound(`No post with ID ${twitId}`)
  }
  res.status(StatusCodes.OK).send()
})



module.export = {
  createPost,
  getAllPosts,
  commentToPost,
  getTwit,
  deleteTwit,
}