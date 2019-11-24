import React from 'react'

import RestaurantSummary from './RestaurantSummary'
import RestaurantSkeleton from './RestaurantSkeleton'

import data from './data'

const handleClick = (restaurant) => {
  console.log('clicked on restaurant!')
  console.log(restaurant)
}

const ListRestaurants = ({ restaurants }) => {
  return (
    <section className='list'>
      {
        restaurants.map(restaurant => {
          return (
            <RestaurantSummary
              key={restaurant.id}
              restaurant={{ ...restaurant }}
              onClick={handleClick}
            />
          )
        })
      }
    </section>
  )
}

export default ListRestaurants
