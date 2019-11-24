import React, { Component } from "react";
import '../App.css'
import { FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import Map from "../Components/Map";
import SearchRestarants from "../Components/Search";
import FilterComponent from "../Components/Filter";
import ListRestaurants from "../Components/ListRestaurants";
import RestaurantSkeleton from '../Components/RestaurantSkeleton'

/**
 * utils
 */
import API from '../Utils/api'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      state: {},
      country: {},
      coords: {},
      restaurants: [],
      restaurantsLoading: false,
      markers: []
    }
  }
  componentDidMount () {
    this.getReviews()
    this.getCurrentLocation()
  }

  async getReviews () {
    try {
      const api = new API('/reviews')
      const reviews = await api.fetchData()
    } catch (error) {
    }
  }

  getCurrentLocation = async () => {
    try {
      const key = 'AIzaSyCj2IDnv8a9yaw4XPRSO4JgKYMuyqWhsEs'
      const api = new API('/restaurants')
      const res = await api.customPost(`https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`)
      const { data } = res
      const { location } = data
      this.setState({ coords: location})
      const radius = 1500
      const type = 'restaurant'


      this.setState({ restaurantsLoading: true})
      const res3 = await api.postData({
        radius,
        type,
        location
      })
      const { data: { responseBody: { coords, restaurants } } } = res3
      this.setState({ restaurantsLoading: false})
      const res2 = await api.customPost(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${key}`)
      const { data: { results }} = res2
      const [ address ] = results
      const { address_components } = address

      // administrative_area_level_1
      const [country] = address_components.filter(component => {
        return component.types.includes('administrative_area_level_1')
      })

      const [state] = address_components.filter(component => {
        return component.types.includes('administrative_area_level_2')
      })

      this.setState({
        markers: coords,
        state,
        country,
        restaurants
      })
    } catch (error) {
    }
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
              containerElement={<div style={{ height: `100vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              markers={this.state.markers}
            />
          </section>
          <section className='sidebar'>
            <div className='controls'>
              <h1><FaMapMarkerAlt /> {this.state.state.long_name}, {this.state.country.short_name}</h1>
              <p><FaInfoCircle /> Click on the Map to add a new restaurant</p>
            </div>
            <FilterComponent />
            <ListRestaurants restaurants={this.state.restaurants}/>
          </section>
        </main>
      </div>
    )
  }
}

export default HomeScreen
