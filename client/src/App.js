import React, { Component } from 'react'
import './App.css'
import { FaFilter } from 'react-icons/fa'

/**
 * components
 */
import Filter from './Components/Filter'
import ListRestaurants from './Components/ListRestaurants'
import Navabar from './Components/Navbar'
import Map from './Components/Map'
import SearchRestarants from './Components/Search'

/**
 * services
 */
import Geolocation from './Services/Geolocation'

/**
 * utils
 */
import API from './Utils/api'


// use context to set user current location
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    }
  }
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

  showControls = () => {
    console.log(this.state)
    this.setState(previousState  => {
      return Object.assign({}, previousState, {
        hidden: !previousState.hidden
      })
    })
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
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </section>
          <section className='sidebar'>
            <div className='controls'>
              <h1 className='header'>Restaurants in Kampala</h1>
              <div>
                <button onClick={this.showControls} className='toggle'><FaFilter /> Filter Restaurants</button>
              </div>
            </div>
            {
              !this.state.hidden ? (
                <div>
                  <SearchRestarants />
                  <Filter />
                </div>
              ) : null
            }
            <ListRestaurants />
          </section>
        </main>
      </div>
    )
  }
}

export default App
