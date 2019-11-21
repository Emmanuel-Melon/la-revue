const express = require('express')
const reviewsRouter = express.Router()

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
reviewsRouter.delete('/:reviewId', (req, res) => {
  res.send('deletes review')
})

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
reviewsRouter.get('/:reviewId', (req, res) => {
  res.send('gets a review')
})

/**
 * @access private
 * @description gets all review
 * @method GET
 * @type {Router}
 */
reviewsRouter.get('/', (req, res) => {
  res.send('gets all reviews')
})

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
reviewsRouter.post('/:restaurantId', (req, res) => {
  res.send('adding a review')
})

module.exports = reviewsRouter
