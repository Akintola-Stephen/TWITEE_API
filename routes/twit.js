const express = require('express')
const router = express.Router()

const {
  createPost,
  getAllPosts,
  commentToPost,
  getTwit,
  deleteTwit
} = require('../controllers/twit')


router.route('/').post(createPost).get(getAllPosts)
router.route('/:id').get(getTwit).delete(deleteTwit).patch(commentToPost)

module.exports = router