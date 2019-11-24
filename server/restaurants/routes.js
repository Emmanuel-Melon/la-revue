const express = require('express')
const restaurantsRouter = express.Router()
const axios = require('axios')

/**
 * controllers
 */
const getRestaurants = require('./controllers/getRestauarants.controller')

restaurantsRouter.post('/', getRestaurants)

module.exports = restaurantsRouter
