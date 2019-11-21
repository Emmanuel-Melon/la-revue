/**
 * Singleton db connection instance
 * static class that provides an interface to access MongoDB
 */
const DBProvider = require('./DBProvider')

/***********************************************************
 * * ************** UTILITY FUNCTIONS **************
 ************************************************************
 */
const { ObjectID } = require('mongodb')

/**
 *
 * @return {string}
 * @param ref
 */
const findCollection = ref => {
  const { collection, db } = ref
  return db.collection(collection)
}

/************************************************************************
 * * **************************** WRITE OPERATIONS  ****************************
 ************************************************************************
 */

/***
 *
 */
class DbWriteInterface {
  constructor (collection, options = {}) {
    this.db = DBProvider.returnDB()
    this.collection = collection
    this.options = options
  }

  static isValidId (_id) {
    return ObjectID.isValid(_id)
  }

  /**
   *
   * @param data
   * @returns {Promise<{doc: *, error: null}|{doc: null, error: *}>}
   */
  async insertOne (data) {
    try {
      const col = DBProvider.findCollection(this.collection)
      const doc = await col.insertOne(data)
      return ({
        doc,
        error: null
      })
    } catch (error) {
      return ({
        doc: null,
        error
      })
    }
  }
}

/************************************************************************
 * * **************************** READ OPERATIONS  ****************************
 ************************************************************************
 */

/**
 *
 */
class DbReadInterface {
  constructor (collection, options = {}) {
    this.db = DBProvider.returnDB()
    this.collection = collection
    this.options = options
  }

  static isValidId (_id) {
    return ObjectID.isValid(_id)
  }

  findOneById (document) {
    const col = DBProvider.findCollection(this.collection)
    return col.find({ _id: ObjectID(document) })
  }

  findOne (document, field) {
    const query = {}
    const col = DBProvider.findCollection(this.collection)
    query[field] = document
    return col.find(query)
  }
}
