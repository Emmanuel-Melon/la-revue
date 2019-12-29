const express = require('express')
const reviewsRouter = express.Router()

/**
 * controllers
 */
const ReviewController = require('./controllers/Review.controller')

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
reviewsRouter.delete('/:reviewId', ReviewController.removeReview)

/************************************************************************
 * * **************************** GET ROUTES  ****************************
 ************************************************************************
 */
/**
 * @access private
 * @description gets all review
 * @method GET
 * @type {Router}
 */
reviewsRouter.get('/:restaurantId', ReviewController.getReviews)

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
reviewsRouter.post('/add', ReviewController.addReview)

module.exports = reviewsRouter
