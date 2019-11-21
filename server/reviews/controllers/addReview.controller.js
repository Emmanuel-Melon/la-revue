/**
 * DAOs
 */
const ReviewsDAO = require('../DAOs/Reviews.DAO')

/**
 *
 * @param req
 * @param res
 */
const addReview = async (req, res) => {
  try {
    const reviewsDAO = new ReviewsDAO()
    const review = await reviewsDAO.addReview(req.body)
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

module.exports = addReview
