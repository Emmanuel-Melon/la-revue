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
   * @returns {Promise<{error: *}|{doc: *, error: null}|{doc: null, error: *}>}
   * @param restaurants
   */
  async addRestaurants (restaurants) {
    try {
      // ensure uniqueness
      return await this.dbWriteInterface.insertMany(restaurants, { "ordered": false })
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
   * ! retrieves everything in the database, no specific query has been provided
   * @returns {Promise<{error: *}>}
   */
  async getRestaurants (location) {
    try {
      console.log(location)
      const cursor = await this.dbReadInterface.find(location)
      return await cursor.toArray()
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
