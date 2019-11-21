const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

/***
 *
 * @param app
 */
const middleware = app => {
  app.use(cors())
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}

module.exports = middleware
