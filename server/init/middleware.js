const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const path = require('path')

/***
 *
 * @param app
 */
const middleware = app => {
  app.use(express.static(path.resolve(__dirname, '../../client/build')))
  app.use(cors())
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}

module.exports = middleware
