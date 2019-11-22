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
      <div>
        {
          restaurants.map(restaurant => {
            console.log(restaurant)
            return <RestaurantSkeleton>
              <RestaurantSummary
                key={restaurant.id}
                restaurant={{ ...restaurant }}
                onClick={() => handleClick(restaurant)}
              />
            </RestaurantSkeleton>
          })
        }
      </div>
    </section>
  )
}

export default ListRestaurants
