/**
 * MongoDB interfaces
 */
const {
  DbReadInterface,
  DbWriteInterface
} = require('../../utils/crud')

class RestaurantsDAO {
  constructor () {
    this.dbWriteInterface = new DbWriteInterface('restaurants')
    this.dbReadInterface = new DbReadInterface('restaurants')
  }

  /**
   *
   * @param restaurant
   * @returns {Promise<{error: *}|{doc: *, error: null}|{doc: null, error: *}>}
   */
  async addRestaurants (restaurant) {
    try {
      // ensure uniqueness
      return await this.dbWriteInterface.insertMany(restaurant)
    } catch (error) {
      return { error }
    }
  }

  /**
   *
   * @param restaurant
   * @returns {Promise<{error: *}|{doc: *, error: null}|{doc: null, error: *}>}
   */
  async addRestaurant (restaurant) {
    try {
      return await this.dbWriteInterface.insertOne(restaurant)
    } catch (error) {
      return { error }
    }
  }

  /**
   *
   * @param locationId
   * @returns {Promise<{error: *}>}
   */
  async getRestaurants (locationId) {
    try {
      return await this.dbReadInterface.findOneById(locationId)
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

module.exports = RestaurantsDAO
