import React from 'react'
import RestaurantSummary from './RestaurantSummary'
import RestaurantSkeleton from './RestaurantSkeleton'
import { ContextConsumer } from '../Screens/Home'

const ListRestaurants = ({ restaurants }) => {
  return (
    <ContextConsumer>
      { context => {
        const { onRestaurantClick } = context
        return (
          <section className='list'>
            {
              restaurants.map(restaurant => {
                return (
                  <RestaurantSummary
                    key={restaurant.id}
                    restaurant={{ ...restaurant }}
                    onClick={onRestaurantClick}
                  />
                )
              })
            }
          </section>
        )
      }}
    </ContextConsumer>
  )
}

export default ListRestaurants
