const express = require('express')

/**
 * init Express.js and Node Server
 */
const app = express()

/**
 * init routes
 */
require('./init/middleware')(app)
require('./init/routes')(app)

module.exports = app
