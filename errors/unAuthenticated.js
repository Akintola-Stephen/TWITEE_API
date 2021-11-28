const { CustomAPIError, createCustomError } = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class unAthenticated extends CustomAPIError {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}


module.exports = unAthenticated