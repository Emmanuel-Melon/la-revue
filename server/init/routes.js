const reviewsRouter = require('../reviews/routes')
const restaurantsRouter = require('../restaurants/routes')

/**
 *
 * @param app
 */
const routes = app => {
  app.use('/api/restaurants', restaurantsRouter)
  app.use('/api/reviews', reviewsRouter)
}

module.exports = routes
