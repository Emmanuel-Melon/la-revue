const express = require('express')
const restaurantsRouter = express.Router()
const axios = require('axios')

/**
 * controllers
 */
const getRestaurants = require('./controllers/getRestauarants.controller')

/************************************************************************
 * * **************************** POST ROUTES  ****************************
 ************************************************************************
 */
/**
 * @access public
 * @description adds and retrieves all restaurants from MongoDB
 * @method POST
 * @type {Router}
 */
restaurantsRouter.post('/', getRestaurants)

module.exports = restaurantsRouter
