import React, { useState, useCallback } from 'react'
import { FaMapMarker, FaEdit, FaExpandArrowsAlt } from 'react-icons/fa'
import Rating from './Ratings'

/**
 * TODO: clicking on a restaurant should open a drawer with detail restaurant info, including imags, directions, etc
 * TODO: should also allow you to add a review
 * TODO: add UI messages
 * TODO: add image uploads
 * TODO: modify expandable component and give it expand directions!
 * TODO: expand other components from your place!
 * TODO: have an expandable overlay just like how Google does  underneath the map control options
 * @param props
 * @returns {*}
 * @constructor
 */
const RestaurantSummary = (props) => {
  const { restaurant } = props
  const { opening_hours } = restaurant

  const [data, handleClick] = useState(null)
  const click = useCallback(
    () => handleClick(prevState => {
      // set data to restaurant and pass over to other components
    }),
    []
  )
  return (
    <article className='list-item' onClick={click}>
      <div className='list-item-info'>
        <div>
          <h3 className='name'> {restaurant.name} { opening_hours ? <span className='open'>Open</span> : <span className='closed'>Closed</span> }</h3>
          <Rating rating={restaurant.rating} /> { restaurant.rating > 4 ? <span className='recommended'>recommended</span> : null}
          <p ><FaMapMarker /> {restaurant.vicinity}</p>
        </div>
        <div>
          <img src={restaurant.icon} alt='icon' />
        </div>
      </div>
      <div className='types'>
        {
          restaurant.types.map(type => {
            return <p className='tag' key={restaurant.types.indexOf(type)}>{type}</p>
          })
        }
      </div>
      <div className='list-item-action'>
        <button className='submit'><FaExpandArrowsAlt /> View Restaurant</button>
      </div>
    </article>
  )
}

export default RestaurantSummary

/**
*/
