import React, { Component } from "react";
import '../App.css'
import { FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";

/**
 * components
 */
import Map from "../Components/Map";
import FilterComponent from "../Components/Filter";
import ListRestaurants from "../Components/ListRestaurants";

/**
 * utils
 */
import API from '../Utils/api'

/**
 * styles
 */
import styled from 'styled-components'
const MapWrapper = styled.section`
  flex: 2;
`
const Sidebar = styled.aside`
  background-image: url("https://img.freepik.com/free-vector/flat-tropical-fruits-pattern_23-2148142993.jpg?size=338&ext=jpg");
  padding: 8px;
  flex: 1;
`

const SidebarHead = styled.div`
  background: rgba(53, 15, 70, 0.85);
  padding: 8px;
  margin-bottom: 0.4em;
`

const Header = styled.h1`
  color: gold;
`

const Text = styled.p`
  color: #eeeeee;
`

const Wrapper = styled.main`
  height: 100%;
  display: flex;
`

/**
 *
 */
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
      <Wrapper>
        <MapWrapper>
          <Map
            isMarkerShown
            googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCj2IDnv8a9yaw4XPRSO4JgKYMuyqWhsEs'
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            markers={this.state.markers}
          />
        </MapWrapper>
        <Sidebar>
          <SidebarHead>
            <Header><FaMapMarkerAlt /> {this.state.state.long_name}, {this.state.country.short_name}</Header>
            <Text><FaInfoCircle /> Click on the Map to add a new restaurant</Text>
          </SidebarHead>
          <FilterComponent />
          <ListRestaurants restaurants={this.state.restaurants}/>
        </Sidebar>
      </Wrapper>
    )
  }
}

export default HomeScreen
