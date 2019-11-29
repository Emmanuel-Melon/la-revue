import React, {
  useEffect,
  useState
} from 'react'

import API from '../Utils/api'

/**
 * components
 */
import RestaurantSummary from '../Components/RestaurantSummary'
import RestaurantInfo from '../Components/RestaurantInfo'

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

const Main = styled.main`
display: flex;
`

const LeftPane = styled.section`
  flex: 2;
`

const RightPane = styled.section`
  flex: 1;
`

/**
 *
 * @returns {*}
 * @constructor
 */
const RestaurantsScreen = () => {
  /**
   *
   */
  const [restaurants, setRestaurants] = useState([])

  const apiCall = async () => {
    try {
      const api = new API({
        resource: '/restaurants',
        source: 'base'
      })

      const radius = 500
      const type = 'restaurant'
      const location = { lat: 0.32358400000000004, lng: 32.5935104 }
      const data = await api.postData({
        radius,
        type,
        location
      })
      const { restaurants } = data
      setRestaurants(restaurants)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    apiCall()
  }, [restaurants])

  return (
    <Main>
      <LeftPane>
        <Header>Recommended</Header>
        <RestaurantInfo />
      </LeftPane>
      <RightPane>
        <Header>Near Me</Header>
        <Horizontal>
          { restaurants ? (
            restaurants.map(restaurant => <RestaurantSummary
              key={restaurant.id}
              restaurant={{ ...restaurant }}
            />)
          ) : null }
        </Horizontal>
      </RightPane>
    </Main>
  )
}

export default RestaurantsScreen
