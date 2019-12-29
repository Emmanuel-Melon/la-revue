const MongoClient = require('mongodb').MongoClient
const NodeEnvironment = require('jest-environment-node')

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

/**
 *
 */
class MongoEnvironment extends NodeEnvironment {
  async setup () {
    this.global.url = url
    if (!this.global.db) {
      this.global.db = await MongoClient.connect(
        url,
        // TODO: Connection Pooling
        // Set the connection pool size to 50 for the testing environment.
        // TODO: Timeouts
        // Set the write timeout limit to 2500 milliseconds for the testing environment.
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
      await super.setup()
    }
  }

  async teardown () {
    await this.global.db.close()
    await super.teardown()
  }

  runScript (script) {
    return super.runScript(script)
  }
}

module.exports = MongoEnvironment
