import React from 'react'

/**
 * components
 */
import RestaurantSummary from '../Components/RestaurantSummary'

import data from '../Components/data'

/**
 * styles
 */
import styled from 'styled-components'
const Horizontal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5em;
  overflow-x: scroll;
`

const Header = styled.h3`
  color: gold;
  text-align: center;
`

/**
 *
 * @returns {*}
 * @constructor
 */
const RestaurantsScreen = () => {
  return (
    <main>
      <section>
        <Header>Recommended</Header>
        <Horizontal>

          {
            data.results.map(restaurant => <RestaurantSummary
              key={restaurant.id}
              restaurant={{ ...restaurant }}
            />)
          }
        </Horizontal>
      </section>
      <section>
        <Header>Near Me</Header>
        <Horizontal>
          {
            data.results.map(restaurant => <RestaurantSummary
              key={restaurant.id}
              restaurant={{ ...restaurant }}
            />)
          }
        </Horizontal>
      </section>
    </main>
  )
}

export default RestaurantsScreen
