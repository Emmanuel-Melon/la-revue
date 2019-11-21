import React from 'react'

import RestaurantSummary from './RestaurantSummary'

import data from './data'

const handleClick = (restaurant) => {
  console.log('clicked on restaurant!')
  console.log(restaurant)
}

const ListRestaurants = () => {
  return (
    <section className='list'>
      <div>
        {
          data.results.map(restaurant => <RestaurantSummary
            key={restaurant.id}
            restaurant={{ ...restaurant }}
            onClick={() => handleClick(restaurant)}
          />)
        }
      </div>
    </section>
  )
}

export default ListRestaurants
