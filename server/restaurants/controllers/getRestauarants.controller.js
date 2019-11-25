const axios = require('axios')

/***
 * DAOs
 */
const RestaurantsDAO = require('../DAOs/Restaurants.DAO')

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRestaurants = async (req, res) => {
  try {
    const key = process.env.GOOGLE_MAPS_API_KEY
    const restaurantsDAO = new RestaurantsDAO()

    const { location: { lat, lng }, type, radius } = req.body
    const result = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${key}`)
    const { data : { results } } = result

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
        restaurants: results
      }
    })
  } catch (error) {
    res.status(404).json({
      message: 'Bad Request',
      statusCode: 404,
      responseBody: {
        error
      }
    })
  }
}

module.exports = getRestaurants
