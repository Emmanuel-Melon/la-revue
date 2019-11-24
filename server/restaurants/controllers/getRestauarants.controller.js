const axios = require('axios')
/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRestaurants = async (req, res) => {
  const key = process.env.GOOGLE_MAPS_API_KEY
  const { location: { lat, lng }, type, radius } = req.body
  const result = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${key}`)

  const coords = result.data.results.map(result => {
    const { geometry: { location }, id } = result
    return {
      id,
      location
    }
  })
  res.status(200).json({
    responseBody: {
      coords,
      restaurants: result.data.results
    }
  })
}

module.exports = getRestaurants
