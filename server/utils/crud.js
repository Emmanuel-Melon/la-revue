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

/************************************************************************
 * * **************************** WRITE OPERATIONS  ****************************
 ************************************************************************
 */

/***
 *
 */
class DbWriteInterface {
  constructor (collection) {
    this.collection = collection
  }

  /**
   *
   * @param _id
   * @returns {boolean}
   */
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

  async insertMany (data) {
    try {
      const col = DBProvider.findCollection(this.collection)
      const doc = await col.updateMany({},
        { $set: [...data] },
        { upsert: true })
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

  /**
   *
   * @param document
   * @param field
   * @returns {Promise<{document: (*|Collection~findAndModifyWriteOpResultObject), error: null}|{data: null, error: *}>}
   */
  async findOneAndDelete (document, field) {
    try {
      const query = {}
      const col = DBProvider.findCollection(this.collection)
      query[field] = ObjectID(document)
      const found = await col.findOneAndDelete(query)
      return ({
        document: found,
        error: null
      })
    } catch (error) {
      return ({
        data: null,
        error
      })
    }
  }

  /**
   *
   * @param document
   * @param data
   * @returns {Promise<{document: (*|Collection~findAndModifyWriteOpResultObject), error: null}|{data: null, error: *}>}
   */
  async findOneAndUpdate (document, data) {
    try {
      const col = DBProvider.findCollection(this.collection)
      const found = await col.findOneAndUpdate({ _id: ObjectID(document) },
        { $set: data })
      return ({
        document: found,
        error: null
      })
    } catch (error) {
      console.log(error)
      return ({
        data: null,
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
  constructor (collection) {
    this.collection = collection
  }

  /**
   *
   * @param _id
   * @returns {boolean}
   */
  static isValidId (_id) {
    return ObjectID.isValid(_id)
  }

  /**
   *
   * @param document
   * @param field
   * @returns {AggregationCursor}
   */
  aggregateById (document, field) {
    const col = DBProvider.findCollection(this.collection)
    const query = {}
    query[field] = ObjectID(document)
    return col.aggregate(
      [ { $match: query } ]
    )
  }

  /**
   *
   * @param document
   * @returns {*}
   */
  findOneById (document) {
    const col = DBProvider.findCollection(this.collection)
    return col.find({ _id: ObjectID(document) })
  }
}

module.exports = {
  DbReadInterface,
  DbWriteInterface
}
