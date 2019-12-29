/**
 * DAOs
 */
const ReviewsDAO = require('../DAOs/Reviews.DAO')

class ReviewController {
  /**
   *
   * @param req
   * @param res
   */
  static async addReview (req, res) {
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
      res.status(503).json({
        message: 'Service Unavailable',
        statusCode: 503,
        responseBody: {
          error
        }
      })
    }
  }

  /**
   *
   * @param req
   * @param res
   */
  static async removeReview (req, res) {
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
      res.status(503).json({
        message: 'Service Unavailable',
        statusCode: 503,
        responseBody: {
          error
        }
      })
    }
  }

  /**
   *
   * @param req
   * @param res
   */
  static async getReviews (req, res) {
    try {
      const { restaurantId } = req.params
      const reviewsDAO = new ReviewsDAO()
      const reviews = await reviewsDAO.getReviews(restaurantId)
      console.log(restaurantId)
      console.log(reviews)
      res.status(200).json({
        message: 'Success',
        statusCode: 200,
        responseBody: {
          reviews
        }
      })
    } catch (error) {
      console.log(error)
      res.status(503).json({
        message: 'Service Unavailable',
        statusCode: 503,
        responseBody: {
          error
        }
      })
    }
  }

}

module.exports = ReviewController
