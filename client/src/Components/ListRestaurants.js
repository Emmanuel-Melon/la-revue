import React from 'react'
import RestaurantSummary from './RestaurantSummary'
// import RestaurantSkeleton from './RestaurantSkeleton'
import { ContextConsumer } from '../Screens/Home'
import NoData from './NoData'
import styled from 'styled-components'
const List = styled.div`
  padding: 0
`

const ListRestaurants = ({ restaurants }) => {
  return (
    <ContextConsumer>
      { context => {
        const { onRestaurantClick } = context
        return (
          <List>
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
          </List>
        )
      }}
    </ContextConsumer>
  )
}

export default ListRestaurants
