import React, {
  Component,
  useEffect,
  useState
} from 'react'

import '../App.css'
import { FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";

/**
 * components
 */
import OverlayedMap from "../Components/Map";
import FilterComponent from "../Components/Filter";
import ListRestaurants from "../Components/ListRestaurants";
import RestaurantInfo from '../Components/RestaurantInfo'

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

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

/**
 * ! an indicator of a memory leak due to an async operation
 */
const HomeScreen = () => {
  /**
   * hooks
   */
  const [restaurants, setRestaurants] = useState([])
  const [city, setCity] = useState({})
  const [country, setCountry] = useState({})
  const [coords, setCoords] = useState([])
  const [hasError, setErrors] = useState(false)
  const [radius, setRadius] = useState(1500)
  const [type, setType] = useState('restaurant')
  const [location, setLocation] = useState({})
  const [zoom, setZoom] = useState(8)

  const apiCall = async () => {
    try {
      const api = new API({
        resource: '/restaurants',
        source: 'base'
      })

      /**
       * fetch location info then send to backend
       * @type {*|*}
       */
      const geolocation = await api.customPost(`https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`)
      const { data } = geolocation
      const { location } = data

      const { coords, restaurants, country, state } = await api.postData({
        radius,
        type,
        location
      })

      // set hooks data
      setRestaurants(restaurants)
      setCity(state)
      setCountry(country)
      setCoords(coords)
      setLocation(location)
    } catch (error) {
      console.log(error)
      setErrors(true)
    }
  }

  useEffect(() => {
    apiCall()
  }, [])

  return (
    <Wrapper>
      <MapWrapper>
        <OverlayedMap
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={coords}
          location={location}
          zoom={zoom}
        >
          <RestaurantInfo />
        </OverlayedMap>
      </MapWrapper>
      <Sidebar>
        <SidebarHead>
          <Header><FaMapMarkerAlt /> {city.long_name}, {country.short_name}</Header>
          <Text><FaInfoCircle /> Click on the Map to add a new restaurant</Text>
        </SidebarHead>
        <FilterComponent />
        <ListRestaurants restaurants={restaurants}/>
      </Sidebar>
    </Wrapper>
  )

}

export default HomeScreen
