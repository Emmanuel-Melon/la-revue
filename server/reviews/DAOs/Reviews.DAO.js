/**
 * MongoDB interfaces
 */
const {
  DbReadInterface,
  DbWriteInterface
} = require('../../utils/crud')

class ReviewsDAO {
  constructor () {
    this.dbWriteInterface = new DbWriteInterface('reviews')
    this.dbReadInterface = new DbReadInterface('reviews')
  }

  async addReview (review) {
    try {
      return await this.dbWriteInterface.insertOne(review)
    } catch (error) {
      return { error }
    }
  }

  /**
   *
   * @returns {Promise<{error: *}|*>}
   */
  async removeReview (reviewId) {
    try {
      return await this.dbWriteInterface.findOneAndDelete(reviewId)
    } catch (error) {
      return { error }
    }
  }

  /**
   * @description returns all likes on a given comment
   * @returns {Promise<{error: *}>}
   */
  async editReview () {
    try {
      const options = {
        ...this.options,
        field: this.subject.name
      }
      return await getAllChildren(this.subject.subjectId, options)
    } catch (error) {
      return { error }
    }
  }

  async getReview (reviewId) {
    try {
      return await this.dbReadInterface.findOneById(reviewId)
    } catch (error) {
      return { error }
    }
  }

  async getReviews (restaurantId) {
    try {
      const aggregationCursor = await this.dbReadInterface.aggregateById(restaurantId, 'restaurantId')
      return await aggregationCursor.toArray()
    } catch (error) {
      return { error }
    }
  }
}

/**
 * @description JsDoc type annotations
 * Success/Error return object
 * @typedef DAOResponse
 * @property {boolean} [success] - Success
 * @property {string} [error] - Error
 */

module.exports = ReviewsDAO
