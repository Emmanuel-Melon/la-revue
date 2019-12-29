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
const RestaurantsDAO = require('../../DAOs/Restaurants.DAO.js')
let restaurantsDAO

/**
 *
 */
describe('Restaurants', () => {
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
    restaurantsDAO = new RestaurantsDAO('restaurants')
  })

  afterAll(async () => {
    await connection.close()
    await db.close()
    server.close()
  })

  /**
   *
   */
  describe('POST /api/restaurants/add', () => {
    const exec = async data => {
      return await request(server)
        .post('/api/restaurants/add')
        .send(data)
    }

    it('Should return HTTP 201', async () => {
      const restaurants = {
        fullName: 'man',
        email: 'emmanuelgatwech@ygmail.com',
        phoneNumber: '+256779914481'
      }
      const httpResponse = await exec(review)
      const mongodbResponse = await restaurantsDAO.addRestaurants(restaurants)
      console.log(Object.keys(mongodbResponse.userDoc))
      const { restaurantsDoc: { insertedId, insertedCount } } = mongodbResponse
      expect(httpResponse.status).toBe(201)
      expect(ObjectID.isValid(insertedId)).toBeTruthy()
      expect(insertedCount).toEqual(1)
    })

  })

  describe('GET /api/restaurants/:restaurantId', () => {
    it('Should return HTTP 200', async () => {
      const _id = '5df6da02b1193032525dd7bc'
      const res = await request(server).get(`/api/restaurants/${_id}`)
      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
    })
  })
})
