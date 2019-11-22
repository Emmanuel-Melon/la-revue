const reviewsRouter = require('../reviews/routes')
const restaurantsRouter = require('../restaurants/routes')

/**
 *
 * @param app
 */
const routes = app => {
  app.use('/restaurants', restaurantsRouter)
  app.use('/reviews', reviewsRouter)
}

module.exports = routes
