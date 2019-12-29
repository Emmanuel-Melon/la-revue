const express = require('express')
const path = require('path')

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
