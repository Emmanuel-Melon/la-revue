/************************************************************************
 * * **************************** EXPRESS SERVER  ****************************
 ************************************************************************
 */
require('dotenv').config()
const app = require('./app')
/************************************************************************
 * * **************************** MONGODB SERVER  ****************************
 ************************************************************************
 */
const DBProvider = require('./utils/DBProvider')

const MongoDBService = require('./services/mongodb')
const mongoDBService = new MongoDBService()
mongoDBService
  .init()
  .then(response => {
    const { db } = response
    // inject DB
    DBProvider.injectDB(db)
  })
  .catch(error => {
    // handle error
  })

/**
 * init express server
 * @type {string | number}
 */
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
