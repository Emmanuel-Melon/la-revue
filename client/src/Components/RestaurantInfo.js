import React, {
  useEffect,
  useState,
  useContext,
  useCallback
} from 'react'

import { FaEdit, FaHamburger, FaMapMarkerAlt } from 'react-icons/fa'

import { ContextConsumer } from '../Screens/Home'

import styled from 'styled-components'
import CustomButton from './CustomButton'
import ReviewSummary from './ReviewSummary'
const RestaurantView = styled.section`
  background: #ffffff;
  padding: 1.5em;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border: solid 0.2em #37104a;
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

const RestaurantInfo = ({ city, country, restaurant }) => {
  const [images, setImages] = useState([])
  const [text, setText] = useState('')
  const photos = restaurant.photos
  const reviews = restaurant.reviews

  const handleInputChange = e => {
    //
    console.log('handling change')
    console.log(e)
  }

  useEffect(() => {
    // do this on the server side
    //
  }, [])
  return (
    <RestaurantView>
      <div>
        <h3><FaHamburger /> {restaurant.name}</h3>
        <p ><FaMapMarkerAlt /> {restaurant.vicinity}</p>
      </div>
      <div />
      { /*
      display images here
            <div>
        {photos && photos.map(photo => {
          return <img key={restaurant.place_id} src={photo.photo_reference} alt='some restaurant' />
        })}
      </div>
      */}
      <div>
        { reviews && reviews.map(review => {
          return <ReviewSummary review={review} key={review._id} />
        })}
      </div>
      <ResaurantActions>
        <Input type='text' placeholder='Add Review' value={text} onChange={handleInputChange} />
        <CustomButton><FaEdit /> Add Review</CustomButton>
      </ResaurantActions>
    </RestaurantView>
  )
}

export default RestaurantInfo
