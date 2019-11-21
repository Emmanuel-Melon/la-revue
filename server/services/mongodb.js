const { MongoClient } = require('mongodb')
const url = 'mongodb+srv://backend:Z*NsqgS5$@jHsF2@cluster0-itr9i.mongodb.net/test?retryWrites=true&w=majority'
const name = 'development'
/**
 *
 * @constructor
 */
const MongoDBService = function () {
  this.name = name
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
