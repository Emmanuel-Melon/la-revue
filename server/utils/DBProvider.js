const { ObjectID } = require('mongodb')
/**
 * @description injects the currently running MongoDB instance into DB interfacing classes
 */
class DBProvider {
  static injectDB (conn) {
    DBProvider.db = conn
  }

  static returnDB () {
    return DBProvider.db
  }

  static findCollection (collection) {
    return DBProvider.db.collection(collection)
  }

  /**
   *
   * @param _id
   * @returns {Promise<*>}
   */
  static async getCurrentUser (_id) {
    try {
      const col = DBProvider.findCollection('users')
      const userCursor = col.find({
        _id: ObjectID(_id)
      })
      const [ user ] = await userCursor.toArray()
      return user
    } catch (error) {
      return error
    }
  }
}

module.exports = DBProvider
