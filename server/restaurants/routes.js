const express = require('express')
const restaurantsRouter = express.Router()
const axios = require('axios')

restaurantsRouter.post('/', async (req, res) => {
  const { location: { lat, lng }, type, radius } = req.body
  console.log(radius)
  const result = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=AIzaSyCj2IDnv8a9yaw4XPRSO4JgKYMuyqWhsEs`)
  res.status(200).json({
    responseBody: {
      restaurants: result.data.results
    }
  })
})

module.exports = restaurantsRouter
