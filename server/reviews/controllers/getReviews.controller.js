/**
 * DAOs
 */
const ReviewsDAO = require('../DAOs/Reviews.DAO')

/**
 *
 * @param req
 * @param res
 */
const getReviews = async (req, res) => {
  try {
    const { restaurantId } = req.params
    const reviewsDAO = new ReviewsDAO()
    const reviews = await reviewsDAO.getReviews(restaurantId)
    res.status(201).json({
      message: 'Success',
      statusCode: 201,
      responseBody: {
        ...reviews
      }
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed',
      statusCode: 400,
      responseBody: {
        error
      }
    })
  }
}

module.exports = getReviews
