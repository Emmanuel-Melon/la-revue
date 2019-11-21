/************************************************************************
 * * **************************** EXPRESS SERVER  ****************************
 ************************************************************************
 */
const app = require('./app')


/************************************************************************
 * * **************************** MONGODB SERVER  ****************************
 ************************************************************************
 */
const DBProvider = require('./utils/DBProvider')

const MongoDBService = require('./services/mongodb')
const mongoDBService = new MongoDBService()
mongoDBService.init()
  .then(response => {
    const { conn, db } = response

    // inject DB
    DBProvider.injectDB(db)
  }).catch(error => {
  // exit process
  console.log(error)
  process.exit(1)
  // log error
})

/**
 * init express server
 * @type {string | number}
 */
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
