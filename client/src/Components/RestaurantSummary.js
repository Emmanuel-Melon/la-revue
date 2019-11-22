import React from 'react'
import { FaMapMarker, FaEdit } from 'react-icons/fa'
import Rating from './Ratings'

const RestaurantSummary = (props) => {
  const { restaurant } = props
  const { opening_hours } = restaurant
  const open_now = true
  return (
      <article className='list-item'>
        <div className='list-item-info'>
          <div>
            <h3 className='name'> {restaurant.name} { opening_hours ? <span className='open'>Open</span> : <span className='closed'>Closed</span> }</h3>
            <Rating rating={restaurant.rating}/> { restaurant.rating > 4 ? <span className='recommended'>recommended</span> : null}
            <p ><FaMapMarker /> {restaurant.vicinity}</p>
          </div>
          <div>
            <img src={restaurant.icon} alt='icon' />
          </div>
        </div>
        <div className='types'>
          {
            restaurant.types.map(type => {
              return <p className='tag'>{type}</p>
            })
          }
        </div>
        <div className='list-item-action'>
          <div>
            <button className='submit'><FaEdit /> Leave a Review</button>
          </div>
        </div>
      </article>
  )
}

export default RestaurantSummary

/**
*/
