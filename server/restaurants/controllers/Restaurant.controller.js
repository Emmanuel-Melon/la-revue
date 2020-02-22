/**
 * 3rd party lib
 */
const axios = require('axios')
const uuid = require('uuid')

/**
 * DAO
 */
const RestaurantsDAO = require('../DAOs/Restaurants.DAO')

class RestaurantController {
  /**
   * validate inputs
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  static async addRestaurant (req, res) {
    try {
      const restaurantsDAO = new RestaurantsDAO('restaurants')
      const restaurant = await restaurantsDAO.addRestaurant({
        id: uuid(),
        ...req.body,
        timestamp: Date.now(),
        geometry: {
          location: {
            lat: 1,
            lng: 2
          }
        }
      })
      res.status(201).json({
        statusCode: 201,
        responseBody: {
          ...restaurant
        },
        message: 'Successfully add restaurant'
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

  /***
   *
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  static async getRestaurants (req, res) {
    try {
      const key = process.env.GOOGLE_MAPS_API_KEY
      const restaurantsDAO = new RestaurantsDAO('restaurants')
      const url = 'https://maps.googleapis.com/maps/api/place'

      const { location: { lat, lng }, type, radius } = req.body
      const result = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${key}`)
      // const place = await axios.get(`${url}/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating,formatted_phone_number&key`)
      const { data: { results } } = result

      // get all coords for displaying markers
      const coords = results.map(result => {
        const { geometry: { location }, id } = result
        return {
          id,
          location
        }
      })

      // fetch country
      const countryResult = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`)
      const { data } = countryResult
      const [ address ] = data.results
      const { address_components } = address

      const hasPhotos = results.filter(result => {
        return result.hasOwnProperty('photos')
      })

      const [country] = address_components.filter(component => {
        return component.types.includes('administrative_area_level_1')
      })

      const [state] = address_components.filter(component => {
        return component.types.includes('administrative_area_level_2')
      })
      const updatedResults = results.map(result => {
        return {
          ...result,
          timestamp: Date.now()
        }
      })
      // it should update existing entries instead of overwriting them
      await restaurantsDAO.addRestaurants(updatedResults)
      const restaurants = await restaurantsDAO.getRestaurants(state.long_name)

      // console.log(restaurants)
      res.status(201).json({
        message: 'OK',
        statusCode: 201,
        responseBody: {
          country,
          state,
          coords,
          restaurants
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
   * @returns {Promise<void>}
   */
  static async getRestaurant (req, res) {
    try {
      const key = process.env.GOOGLE_MAPS_API_KEY
      const restaurantsDAO = new RestaurantsDAO('restaurants')

      const { location: { lat, lng }, type, radius } = req.body
      const result = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${key}`)
      const { data: { results } } = result

      // get all coords for displaying markers
      const coords = results.map(result => {
        const { geometry: { location }, id } = result
        return {
          id,
          location
        }
      })

      // fetch country
      const countryResult = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`)
      const { data } = countryResult
      const [ address ] = data.results
      const { address_components } = address

      const hasPhotos = results.filter(result => {
        return result.hasOwnProperty('photos')
      })

      const [country] = address_components.filter(component => {
        return component.types.includes('administrative_area_level_1')
      })

      const [state] = address_components.filter(component => {
        return component.types.includes('administrative_area_level_2')
      })

      await restaurantsDAO.addRestaurants(results)

      res.status(201).json({
        message: 'OK',
        statusCode: 201,
        responseBody: {
          country,
          state,
          coords,
          restaurants: results // supposed to come from db
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
}

module.exports = RestaurantController
