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

const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/test?retryWrites=true&w=majority`
console.log(url)
/**
 *
 * @constructor
 */
const MongoDBService = function () {
  this.name = MONGO_DATABASE
  this.url = url
  this.options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
}

/**
 *
 * @return {Promise<{conn: MongoClient, error: null, db: *}|{conn: null, error: *}>}
 */
MongoDBService.prototype.connect = async function () {
  try {
    const client = new MongoClient(this.url, this.options)
    /**
     *
     * @type {MongoClient}
     */
    const conn = await client.connect()
    const db = client.db(this.name)
    return ({
      conn,
      db,
      error: null
    })
  } catch (error) {
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
