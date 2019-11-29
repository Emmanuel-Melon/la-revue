const express = require('express')
const restaurantsRouter = express.Router()
const axios = require('axios')

/**
 * controllers
 */
const addRestaurant = require('./controllers/addRestaurant.controller')
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

/**
 * @access public
 * @description adds and retrieves all restaurants from MongoDB
 * @method POST
 * @type {Router}
 */
restaurantsRouter.post('/add', addRestaurant)

module.exports = restaurantsRouter
