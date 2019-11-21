const reviewsRouter = require('../reviews/routes')

/**
 *
 * @param app
 */
const routes = app => {
  app.use('/reviews', reviewsRouter)
}

module.exports = routes
