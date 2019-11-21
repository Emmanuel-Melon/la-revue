import React, { Component } from 'react'
import './App.css'

/**
 * components
 */
import Filter from './Components/Filter'
import ListRestaurants from './Components/ListRestaurants'
import Navabar from './Components/Navbar'
import Map from './Components/Map'

/**
 * services
 */
import Geolocation from './Services/Geolocation'

/**
 * utils
 */
import API from './Utils/api'

class App extends Component {
  componentDidMount () {
    this.getReviews()
  }

  async getReviews () {
    try {
      const api = new API('/reviews')
      const reviews = await api.fetchData()
      console.log(reviews)
    } catch (error) {
      console.log(error)
    }
  }
  render () {
    return (
      <div>
        <Navabar />
        <main className='wrapper'>
          <section className='map'>
            <Map
              isMarkerShown
              googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCj2IDnv8a9yaw4XPRSO4JgKYMuyqWhsEs'
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </section>
          <section className='sidebar'>
            <h1 className='header'>Nearby Restaurants</h1>
            <Filter />
            <ListRestaurants />
          </section>
        </main>
      </div>
    )
  }
}

export default App
