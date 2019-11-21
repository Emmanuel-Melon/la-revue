/**
 * DAOs
 */
const ReviewsDAO = require('../DAOs/Reviews.DAO')

/**
 *
 * @param req
 * @param res
 */
const removeReview = async (req, res) => {
  try {
    const { reviewId } = req.params
    const reviewsDAO = new ReviewsDAO()
    const review = await reviewsDAO.removeReview(reviewId)
    res.status(201).json({
      message: 'Success',
      statusCode: 201,
      responseBody: {
        ...review
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

module.exports = removeReview
