const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const twitSchema = mongoose.Schema({
  // name: String,
  twit: {
    type: String,
    required: [true, 'Please Post a Twit'],
    minlenght: 3,
    maxlength: 500,
  },

  like: {
    type: Boolean
  },

  comment: [{ body: String, date: Date }],

  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  }

}, { timestamps: true })



module.exports = mongoose.model('Twit', twitSchema)


