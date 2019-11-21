import axios from 'axios'

class API {
  constructor (resource) {
    this.baseUrl = 'http://localhost:5000'
    this.resource = resource

    // base axios instance
    this.baseInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        // Google API keys
      }
    })
  }

  async fetchData () {
    try {
      const response = await this.baseInstance.get(this.resource)
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
      const response = await this.baseInstance.post(`${this.resource}`, data)
      return {
        ...response
      }
    } catch (error) {
      console.log(error)
      return {
        error,
        message: 'Failed to post data'
      }
    }
  }
}

export default API
