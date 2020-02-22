import React, { useReducer } from 'react'
import RestaurantSummary from './RestaurantSummary'
// import RestaurantSkeleton from './RestaurantSkeleton'
import { ContextConsumer } from '../Screens/Home'
import NoData from './NoData'

import styled from 'styled-components'
const List = styled.div`
  padding: 0
`

const ListRestaurants = ({ restaurants }) => {

  // you might need to do this here?
  // then dispatch other actions to update markers etc
  // restaurants.length === 0 use for when you're fetching data
  return (
    <ContextConsumer>
      { context => {
        const { onRestaurantClick } = context
        return (
          <List>
            {
              (!restaurants || !Array.isArray(restaurants)) ? (
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
