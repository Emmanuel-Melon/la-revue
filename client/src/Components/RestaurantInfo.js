import React, {
  useEffect,
  useState,
  useContext
} from 'react'

import { FaEdit, FaMapMarker, FaWindowClose } from 'react-icons/fa'
import { Context } from "../Screens/Home";

import styled from 'styled-components'
import CustomButton from './CustomButton'
import CustomImage from './CustomImage'
import ReviewSummary from './ReviewSummary'
import API from '../Utils/api'
import Rating from './Ratings'


const RestaurantView = styled.section`
  background: #ffffff;
  min-width: 200px;
  max-width: 500px;
  padding: 1em;
  
  & h3 {
    font-size: 24px;
  }
  
  & h4 {
  font-size: 21px;
  }
`

const ResaurantActions = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Close = styled.span`
  transition: all .3s ease-in-out;
  &:hover {
    color: red;
    cursor: pointer;
  }
`

const Input = styled.input`
  display: block;
  width: 95%;
  margin-bottom: 0.5em;
  padding: 0.5em;
  border: solid 0.1em #37104a;
`

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const RestaurantInfo = ({ restaurant }) => {
  const [isLoading, setLoading] = useState(false)
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState(null)
  const [images, setImages] = useState([])
  const [text, setText] = useState('')
  const [streetView, updateStreetView] = useState('')

  const info = useContext(Context)

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
    fetchStreetView()
  }, [restaurant])

  // check if the restaurant object is empty
  if (Object.entries(restaurant).length === 0 && restaurant.constructor === Object) {
    return null
  }

  // const { geometry: { location: { lat, lng }}} = restaurant

  // if(error) // display error component
  return (
    <div>
      { !isLoading ? (
        <RestaurantView>
          <div>
            <Header>
              <h3>{restaurant.name} { restaurant.opening_hours ? <span className='open'>Open</span> : <span className='closed'>Closed</span> } </h3>
              <Close><FaWindowClose onClick={info.closeModal}/></Close>
            </Header>
            <span>{restaurant.rating} <Rating rating={restaurant.rating} /> ({restaurant.user_ratings_total})</span>
            <CustomImage src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${restaurant.geometry.location.lat},${restaurant.geometry.location.lng}&fov=80&heading=70&pitch=0
&key=${key}`} alt='street view' />
            <p ><FaMapMarker /> {restaurant.vicinity}</p>
          </div>
          <div />
          <div>
            <h5>Reviews</h5>
            <ResaurantActions>
              <Input
                type='text'
                placeholder='restaurant name'
                value={text} onChange={e => setText(e.target.value)}
                name='restaurant'
              />
              <CustomButton onClick={addReview}><FaEdit /> Add Review</CustomButton>
            </ResaurantActions>
            {
              !reviews.length ? (
                <div>
                  <p>This restaurant has no reviews</p>
                </div>
              ) : (
                reviews.map(review => {
                  return <ReviewSummary review={{ ...review }} key={review._id} />
                })
              )
            }
          </div>
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

