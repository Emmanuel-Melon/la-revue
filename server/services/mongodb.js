const { MongoClient } = require('mongodb')

/**
 * mongodb environment variables
 */
const {
  MONGO_DATABASE,
  MONGO_HOST,
  MONGO_PASSWORD,
  MONGO_USER
} = process.env

const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`
/**
 *
 * @constructor
 */
const MongoDBService = function () {
  this.url = url
  this.options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
}

// kfrNtOj2yySsGi3e

/**
 *
 * @return {Promise<{conn: MongoClient, error: null, db: *}|{conn: null, error: *}>}
 */
MongoDBService.prototype.connect = async function () {
  try {

    const client = new MongoClient(this.url, this.options)
    console.log(this.url)
    /**
     *
     * @type {MongoClient}
     */

    const conn = await client.connect()
    const db = client.db(MONGO_DATABASE)
    return ({
      conn,
      db,
      error: null
    })
  } catch (error) {
    console.log('damn son')
    return ({
      conn: null,
      error
    })
  }
}

MongoDBService.prototype.init = async function () {
  return await this.connect()
}

/**
 * a single instance of MongoDB service
 * connection pooling is handled by Node.js
 * @type {MongoDBService}
 */

module.exports = MongoDBService
