const express = require('express')
const restaurantsRouter = express.Router()

/**
 * controllers
 */
const RestaurantController = require('./controllers/Restaurant.controller')

/************************************************************************
 * * **************************** GET ROUTES  ****************************
 ************************************************************************
 */
/**
 * @access public
 * @description retrieves all restaurants from MongoDB
 * @method GET
 * @type {Router}
 */
restaurantsRouter.post('/', RestaurantController.getRestaurants)

/**
 * @access public
 * @description retrieves a single restaurant from MongoDB
 * @method GET
 * @type {Router}
 */
restaurantsRouter.get('/:restaurantId', RestaurantController.getRestaurant)

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
restaurantsRouter.post('/add', RestaurantController.addRestaurant)

module.exports = restaurantsRouter
