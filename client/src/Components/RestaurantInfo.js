import React, {
  useEffect,
  useState,
  useContext,
  useCallback
} from 'react'

import { FaEdit, FaHamburger, FaMapMarkerAlt } from 'react-icons/fa'

import styled from 'styled-components'
import CustomButton from './CustomButton'
import CustomImage from './CustomImage'
import ReviewSummary from './ReviewSummary'
import API from "../Utils/api";
import axios from 'axios'


const RestaurantView = styled.section`
  background: #ffffff;
  padding: 1em;
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  overflow-y: scroll;
  min-width: 200px;
  max-width: 500px;
  border-radius: 0.5em;
  
  & h3 {
    font-size: 24px;
  }
  
  & h4 {
  font-size: 18px;
  }
`

const ResaurantActions = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  display: block;
  width: 95%;
  margin-bottom: 0.5em;
  padding: 0.5em;
  border: solid 0.1em #37104a;
`

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const RestaurantInfo = ({ city, country, restaurant }) => {
  const [isLoading, setLoading] = useState(false)
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState(null)
  const [images, setImages] = useState([])
  const [text, setText] = useState('')
  const [streetView, updateStreetView] = useState('')
  const photos = restaurant.photos

  const handleInputChange = e => {
    const { target: { name, value } } = e
    setText(value);
  }


  const addReview = async () => {
    try {
      const api = new API({
        resource: 'reviews/add',
        source: 'base'
      })
      const { id } = restaurant
      const review = {
        text,
        restaurantId: id,
        timestamp: Date.now()
      }
      const response = await api.postData(review)
      setText('')
      setReviews([review, ...reviews])
    } catch (error) {
      setError(error)
    }
  }

  const getReviews = async () => {
    try {
      const api = new API({
        resource: `reviews/${restaurant.id}`,
        source: 'base'
      })
      setLoading(true)
      const response = await api.fetchData()
      const data = response.data.responseBody
      setReviews(data.reviews)
      setLoading(false)
    } catch (error) {
      setError(error)
    }
  }

  const fetchStreetView = async () => {
    try {
      const api = new API({
        resource: `streetview?size=400x400&location=${restaurant.geometry.location.lat},${restaurant.geometry.location.lng}&fov=80&heading=70&pitch=0
&key=${key}`,
        source: 'maps'
      })
      const response = await api.fetchData()
      if(response.status === 200) {
        console.log(response.status)
        updateStreetView(response.data)
      }
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    getReviews()
    // fetchStreetView()
  }, [restaurant])


  // check if the restaurant object is empty
  if(Object.entries(restaurant).length === 0 && restaurant.constructor === Object) {
    return null
  }

  console.log(restaurant)
  const { geometry: { location: { lat, lng }}} = restaurant
  return (
    <div>
      { !isLoading ? (
        <RestaurantView>
          <div>
            <h3>{restaurant.name}</h3>
            <CustomImage
              src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${restaurant.geometry.location.lat},${restaurant.geometry.location.lng}&fov=80&heading=70&pitch=0
&key=${key}`}
              alt=''
            />
          </div>
          <div />
          <div>
            {
              !reviews.length ? (
                <div>
                  <p>This restaurant has no reviews</p>
                </div>
              ) : (
                reviews.map(review => {
                  return <ReviewSummary review={{...review}} key={review._id} />
                })
              )
            }
          </div>
          <ResaurantActions>
            <Input
              type='text'
              placeholder='Your review'
              onChange={handleInputChange}
              name='review'
              value={text}
            />
            <CustomButton onClick={addReview}><FaEdit /> Add Review</CustomButton>
          </ResaurantActions>
        </RestaurantView>
      ) : (
        <RestaurantView>
          <h3>Loading Restaurant</h3>
        </RestaurantView>
      )
      }
    </div>
  )
}

export default RestaurantInfo
