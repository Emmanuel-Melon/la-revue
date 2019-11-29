/**
 * DAO
 */
const RestaurantsDAO = require('../DAOs/Restaurants.DAO')

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const addRestaurant = async (req, res) => {
  try {
    console.log(req.body)
    const restaurantsDAO = new RestaurantsDAO('restaurants')
    const restaurant = await restaurantsDAO.addRestaurants(req.body)
    res.status(201).json({
      statusCode: 201,
      responseBody: {
        ...restaurant
      },
      message: 'Successfully add restaurant'
    })
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      responseBody: {
        error
      },
      message: 'Failed to add restaurant'
    })
  }
}

module.exports = addRestaurant
