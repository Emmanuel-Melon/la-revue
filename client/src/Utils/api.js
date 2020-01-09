import axios from 'axios'
const urlsMap = new Map()

urlsMap.set('base', 'http://localhost:5000/api/')
urlsMap.set('google', 'https://www.googleapis.com')
urlsMap.set('maps', 'https://maps.googleapis.com/maps/api/')

/**
 *
 */
class API {
  constructor (options) {
    const { resource, source, params } = options
    this.resource = resource
    this.params = params
    this.baseInstance = axios.create({
      baseURL: urlsMap.get(source)
    })
  }

  async fetchData () {
    try {
      const response = await this.baseInstance.get(this.resource, {
        ...this.params
      })
      return {
        ...response
      }
    } catch (error) {
      return {
        error,
        message: 'Failed to fetch data'
      }
    }
  }

  async postData (data) {
    try {
      const response = await this.baseInstance.post(this.resource, data)
      const { data: { responseBody } } = response
      return {
        ...responseBody
      }
    } catch (error) {
      return {
        error,
        message: 'Failed to post data'
      }
    }
  }

  async customPost (endpoint, data) {
    try {
      return await axios.post(endpoint)
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default API
