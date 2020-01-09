import React, {createContext, useEffect, useState} from 'react'

import '../App.css'
import {FaInfoCircle, FaMapMarkerAlt} from 'react-icons/fa'
import uuid from 'uuid'
/**
 * components
 */
import OverlayedMap from '../Components/Map'
import FilterComponent from '../Components/Filter'
import ListRestaurants from '../Components/ListRestaurants'
import RestaurantInfo from '../Components/RestaurantInfo'
import AddRestaurant from '../Components/AddRestaurant'
import Offline from './Offline'

import Expandable, {Body, Header} from '../Components/Expandable'
/**
 * utils
 */
import API from '../Utils/api'
/**
 * styles
 */
import styled from 'styled-components'

const MapWrapper = styled.section`
  overflow: hidden;
`
const Sidebar = styled.aside`
  background: #ffffff;
  flex: 1;
  z-index: 1;
  position: absolute;
  top: 105px;
  right: 60px;
  max-width: 450px;
  max-height: 650px;
  overflow-y: scroll;
 
`

const Controls = styled.div`
  z-index: 1;
  position: absolute;
  top: 150px;
  left: 10px;
  max-width: 500px;
  width: 500px;
  max-height: 600px;
  overflow-y: scroll;
`

const SidebarHead = styled.div`
  background: rgba(53, 15, 70, 0.85);
  padding: 8px;
  margin-bottom: 0.4em;
  max-height: 600px;
`

const Heading = styled.h1`
  color: gold;
`

const Text = styled.p`
  color: #eeeeee;
`

const Wrapper = styled.main`
  width: 100%;
 
`

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

/**
 * context
 */
const HomeContext = createContext(null)
const { Consumer, Provider } = HomeContext

const HomeScreen = () => {
  /**
   * hooks
   */
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState({})
  const [city, setCity] = useState({})
  const [country, setCountry] = useState({})
  const [coords, setCoords] = useState([])
  const [hasError, setErrors] = useState(false)
  const [radius, setRadius] = useState(1500)
  const [type, setType] = useState('restaurant')
  const [location, setLocation] = useState({})
  const [zoom, setZoom] = useState(13)
  const [mapLoading, setMapLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [restaurantName, setName] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [min, updateMin] = useState(1)
  const [max, updateMax] = useState(4)
  const [lat, updateLat] = useState(0)
  const [lng, updateLng] = useState(0)

  const onOverlayClick = e => {
    console.log('clicked overlay!')
    console.log(e)
    setModalVisible(true)
  }
  const onMapClick = e => {
    console.log(e)
    updateLat(e.latLng.lat())
    updateLng(e.latLng.lng())
    setModalVisible(true)
  }

  const onRestaurantSelect = restaurant => {
    setSelectedRestaurant(restaurant)
  }

  const addRestaurant = async restaurant => {
    try {
      const api = new API({
        resource: 'restaurants/add',
        source: 'base'
      })
      console.log(restaurant)
      const response = await api.postData(restaurant)
      console.log(response.doc)
      setRestaurants(() => {
        const updatedRestaurant = {
          ...restaurant,
          id: uuid()
        }
        const newRestaurants = restaurants.unshift(updatedRestaurant)
        console.log(newRestaurants)
        return restaurants
      })
      setSuccessMessage('Restaurant Added')
      setModalVisible(false)
    } catch (error) {
      setErrorMessage(error)
    }
  }

  const apiCall = async (options) => {
    try {
      const api = new API({
        resource: '/restaurants',
        source: 'base',
        params: options
      })

      /**
       * fetch location info then send to backend
       * @type {*|*}
       */
      setMapLoading(true)
      const geolocation = await api.customPost(`https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`)
      setMapLoading(false)
      const { data: { location } } = geolocation

      const { coords, restaurants, country, state } = await api.postData({
        radius,
        type,
        location
      })

      // set hooks data
      console.log(restaurants)
      setRestaurants(restaurants)
      setCity(state)
      setCountry(country)
      setCoords(coords)
      setLocation(location)
    } catch (error) {
      setErrors(true)
    }
  }

  useEffect(() => {
    apiCall()
  }, [])

  console.log(restaurants)

  const updateRestaurants = (min, max) => {
    console.log('updating restaurants')
    console.log(restaurants)
    const updatedRestaurants = restaurants.filter(restaurant => {
      console.log(restaurant.rating)
      return restaurant.rating >= min && restaurant.rating <= max
    })
    console.log(updatedRestaurants)
    setRestaurants(updatedRestaurants)
    const newCoords = updatedRestaurants.map(restaurant => ({ location: restaurant.geometry.location, id: restaurant.id }))
    setCoords(newCoords)
  }

  if(hasError) return <Offline />
  return (
    <Provider value={{
      location,
      markers: coords,
      restaurants,
      zoom,
      onMapClick,
      onRestaurantClick: onRestaurantSelect,
      selectedRestaurant,
      country,
      city,
      onOverlayClick,
      addRestaurant,
      updateRestaurants,
      min,
      max,
      lat,
      lng
    }}>
      <Wrapper>
        <MapWrapper style={{ height: `100vh`, overflow: 'hidden' }}>
          <OverlayedMap
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
            loadingElement={<div style={{ height: `100vh` }} />}
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100vh` }} />}
          >
            <h3 style={{ display: 'none' }}>Hello</h3>
          </OverlayedMap>
          <div>
            <Controls>

              { modalVisible ? <AddRestaurant addRestaurant={addRestaurant} /> : null }
              <RestaurantInfo
                city={city}
                country={country}
                restaurant={selectedRestaurant}
              />
            </Controls>
            <Sidebar>
              <div>
                <SidebarHead>
                  <Heading><FaMapMarkerAlt /> {city.long_name}, {country.short_name}</Heading>
                  <Text><FaInfoCircle /> Click on map to add new restaurant</Text>
                </SidebarHead>
                <ListRestaurants
                  restaurants={restaurants}
                />
              </div>
            </Sidebar>
          </div>
        </MapWrapper>
      </Wrapper>
    </Provider>
  )
}


// current view should only show AddRestaurant or RestaurantInfo but not both at the same time
export const ContextConsumer = Consumer
export default HomeScreen

/**
 *           <div>
 <RestaurantInfo
 city={city}
 country={country}
 restaurant={selectedRestaurant}
 />
 { modalVisible ? <AddRestaurant addRestaurant={addRestaurant} /> : null }
 </div>
 */
