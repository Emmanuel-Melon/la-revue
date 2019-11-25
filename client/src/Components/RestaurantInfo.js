import React, {
  useEffect,
  useState,
  useContext,
  useCallback
} from 'react'

import styled from 'styled-components'
const RestaurantView = styled.section`
  background: #ffffff;
  padding: 1.5em;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border: solid 0.2em #37104a;
`

const RestaurantInfo = () => {
  return (
    <RestaurantView>
      <h3>Restaurant Info!</h3>
      <p>We really in the field!</p>
    </RestaurantView>
  )
}

export default RestaurantInfo
