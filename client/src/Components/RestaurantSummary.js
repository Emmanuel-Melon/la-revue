import React from 'react'

const RestaurantSummary = (props) => {
  const { restaurant } = props
  return (
    <article className='list-item'>
      <div className='list-item-info'>
        <div>
          <img src={restaurant.icon} alt='icon' />
        </div>
        <div>
          <h3 className='header'>{restaurant.name}</h3>
          <p className='sub-header'>{restaurant.vicinity}</p>
        </div>
      </div>
      <div className='list-item-action'>
        <div>
          <span className='ratings'>{restaurant.rating}</span>
          <button>Add Review</button>
        </div>
      </div>
    </article>
  )
}

export default RestaurantSummary
