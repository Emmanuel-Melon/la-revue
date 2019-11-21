const express = require('express')
const reviewsRouter = express.Router()

/**
 * controllers
 */
const addReview = require('./controllers/addReview.controller')
const getReview = require('./controllers/getReview.controller')
const getReviews = require('./controllers/getReviews.controller')
const removeReview = require('./controllers/removeReview.controller')

/************************************************************************
 * * **************************** DELETE ROUTES  ****************************
 ************************************************************************
 */
/**
 * @access private
 * @description deletes a review
 * @method DELETE
 * @type {Router}
 */
reviewsRouter.delete('/:reviewId', removeReview)

/************************************************************************
 * * **************************** GET ROUTES  ****************************
 ************************************************************************
 */
/**
 * @access private
 * @description gets review
 * @method GET
 * @type {Router}
 */
reviewsRouter.get('/:reviewId', getReview)

/**
 * @access private
 * @description gets all review
 * @method GET
 * @type {Router}
 */
reviewsRouter.get('/', getReviews)

/************************************************************************
 * * **************************** PUT ROUTES  ****************************
 ************************************************************************
 */
/**
 * @access private
 * @description edits a review
 * @method PUT
 * @type {Router}
 */
reviewsRouter.put('/:reviewId', (req, res) => {
  res.send('editing a review')
})

/************************************************************************
 * * **************************** POST ROUTES  ****************************
 ************************************************************************
 */
/**
 * @access private
 * @description adds a new review
 * @method POST
 * @type {Router}
 */
reviewsRouter.post('/:restaurantId', addReview)

module.exports = reviewsRouter
