import React, { Component } from "react";
import '../App.css'
import { FaFilter, FaInfo, FaInfoCircle } from "react-icons/fa";
import Map from "../Components/Map";
import SearchRestarants from "../Components/Search";
import FilterComponent from "../Components/Filter";
import ListRestaurants from "../Components/ListRestaurants";

/**
 * utils
 */
import API from '../Utils/api'

class HomeScreen extends Component {
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
              <h1>Restaurants in Kampala</h1>
              <p><FaInfoCircle /> Click on the Map to add a new restaurant</p>
            </div>
            <FilterComponent />
            <ListRestaurants />
          </section>
        </main>
      </div>
    )
  }
}

export default HomeScreen
