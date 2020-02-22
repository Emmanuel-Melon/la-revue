import React, {createContext, useEffect, useReducer, useState, Fragment} from 'react'

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
// import Expandable, {Body, Header} from '../Components/Expandable'
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
  // sets the OG restaurants thing
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
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [lat, updateLat] = useState(0)
  const [lng, updateLng] = useState(0)
  const [filter, setFilter] = useState(false)
  const [filtered, setFiltered] = useState([])


  const onOverlayClick = e => {
    console.log(e)
    console.log('here')
    setModalVisible(true)
  }

  const onMapClick = e => {
    console.log(e)
    console.log(e.latLng)
    console.log('amazing')
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
      const response = await api.postData(restaurant)

        const updatedRestaurant = {
          ...restaurant,
          id: uuid()
        }
        console.log(restaurants)
        console.log(filter)
        // array.unshift
        // const newRestaurants = restaurants.unshift(updatedRestaurant)
        // console.log(newRestaurants)
        // setRestaurants([newRestaurants, ...restaurants])

      setSuccessMessage('Restaurant Added')
      setModalVisible(false)
      // didn't call?
      setRestaurants([updatedRestaurant, ...restaurants])
    } catch (error) {
      setErrorMessage(error)
    }
  }

  const apiCall = async (options = {}) => {
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
      // what is geolocation returning?
      const geolocation = await api.customPost(`https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`)
      setMapLoading(false)
      const { data: { location } } = geolocation

      const { coords, restaurants, country, state } = await api.postData({
        radius,
        type,
        location
      })

      console.log(coords)

      // set hooks data
      setRestaurants(restaurants)
      setCity(state)
      setCountry(country)
      setCoords(coords)
      setLocation(location)
    } catch (error) {
      setErrors(true)
    }
  }

  // does placing this above or below affect anything?
  useEffect(() => {
    apiCall()
  }, [])

  function reducer (state, action) {
    switch (action.type) {
      case 'increment':
      {
        // what state are we giving to this reducer?

        console.log(`decrementing by: ${action.payload.max}`)
        setFilter(true)
        //
        const updatedRestaurants = restaurants.filter(restaurant => {
          return restaurant.rating >= action.payload.min && restaurant.rating <= action.payload.max
        })

        //
        const newCoords = updatedRestaurants.map(restaurant => ({ location: restaurant.geometry.location, id: restaurant.id }))
        setCoords(newCoords)
        setFiltered(updatedRestaurants)
        // am I supposed to return or set state?
        return updatedRestaurants
      }
      case 'decrement':
      {
        const updatedRestaurants = restaurants.filter(restaurant => {
          // min or action.payload?
          return restaurant.rating >= action.payload.min && restaurant.rating <= action.payload.max
        })
        setFilter(true)

        const newCoords = updatedRestaurants.map(restaurant => ({ location: restaurant.geometry.location, id: restaurant.id }))
        setCoords(newCoords)
        setFiltered(updatedRestaurants)
        return updatedRestaurants
      }
      default:
        setFilter(false)
        return restaurants
    }
  }

  const [filteredRestaurants, setFilteredRestaurants] = useReducer(reducer, restaurants);


  const updateRestaurants = (restaurants) => {

      setRestaurants(restaurants)
    // you'll really need this newCoords array
      const newCoords = restaurants.map(restaurant => ({ location: restaurant.geometry.location, id: restaurant.id }))
      setCoords(newCoords)

  }

  if (hasError) return <Offline />
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
      updateRestaurants: setFilteredRestaurants,
      setCoords,
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
          <Fragment>
            <Controls>
              { modalVisible ? <AddRestaurant addRestaurant={addRestaurant} /> : null }
              <RestaurantInfo
                city={city}
                country={country}
                restaurant={selectedRestaurant}
              />
            </Controls>
            <Sidebar>
              <Fragment>
                <SidebarHead>
                  <Heading><FaMapMarkerAlt /> {city ? city.long_name : "Your City" }, {country ? country.short_name : "Country" }</Heading>
                  <Text><FaInfoCircle /> Click on map to add new restaurant</Text>
                </SidebarHead>
                <FilterComponent restaurants={restaurants} />
                {
                  filter ? (<ListRestaurants restaurants={filtered} />) : (
                    <ListRestaurants restaurants={restaurants} />
                  )
                }
              </Fragment>
            </Sidebar>
          </Fragment>
        </MapWrapper>
      </Wrapper>
    </Provider>
  )
}

export const ContextConsumer = Consumer
export const Context = HomeContext
export default HomeScreen
