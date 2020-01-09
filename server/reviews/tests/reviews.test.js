/**
 * test server setup
 */
const { MongoClient, ObjectID } = require('mongodb')
let server
let connection
let db
const request = require('supertest')

/**
 * db config
 * @type {DBProvider}
 */
const DBProvider = require('../../utils/DbProvider')

/**
 *
 * @type {UserDAO}
 */
const ReviewsDAO = require('../../DAOs/Reviews.DAO.js')
let reviewsDAO

/**
 *
 */
describe('Reviews', () => {
  /**
   * init express server
   * inject MongoDB
   */
  beforeAll(async () => {
    // init server
    server = require('../../../server.js')

    connection = await MongoClient.connect(global.url, {
      useNewUrlParser: true
    })
    DBProvider.injectDB(global.db)

    // new review DAO object
    reviewsDAO = new ReviewsDAO('reviews')
  })

  afterAll(async () => {
    await connection.close()
    await db.close()
    server.close()
  })

  /**
   *
   */
  describe('POST /api/reviews/add', () => {
    const exec = async data => {
      return await request(server)
        .post('/api/users/register')
        .send(data)
    }

    it('Should return HTTP 201', async () => {
      const review = {
        fullName: 'man',
        email: 'emmanuelgatwech@ygmail.com',
        phoneNumber: '+256779914481'
      }
      const httpResponse = await exec(review)
      const mongodbResponse = await reviewsDAO.addReview(review)
      const { reviewDoc: { insertedId, insertedCount } } = mongodbResponse
      expect(httpResponse.status).toBe(201)
      expect(ObjectID.isValid(insertedId)).toBeTruthy()
      expect(insertedCount).toEqual(1)
    })
  })

  describe('GET /api/reviews/:reviewId', () => {
    it('Should return HTTP 200', async () => {
      const _id = '5df6da02b1193032525dd7bc'
      const res = await request(server).get(`/api/reviews/${_id}`)
      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
    })
  })
})
