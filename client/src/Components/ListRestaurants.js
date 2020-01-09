import React from 'react'
import RestaurantSummary from './RestaurantSummary'
// import RestaurantSkeleton from './RestaurantSkeleton'
import { ContextConsumer } from '../Screens/Home'
import NoData from './NoData'

const ListRestaurants = ({ restaurants }) => {
  return (
    <ContextConsumer>
      { context => {
        const { onRestaurantClick } = context
        return (
          <section className='list'>
            {
              (restaurants.length === 0 || !Array.isArray(restaurants)) ? (
                <NoData message='No Restaurants Available' image='https://www.pngkey.com/png/detail/323-3231043_despicable-me-merry-christmas-card-minions.png' />
              ) : (
                restaurants.map(restaurant => {
                  return (
                    <RestaurantSummary
                      key={restaurant.id}
                      restaurant={{ ...restaurant }}
                      onClick={onRestaurantClick}
                    />
                  )
                })
              )
            }
          </section>
        )
      }}
    </ContextConsumer>
  )
}

export default ListRestaurants
