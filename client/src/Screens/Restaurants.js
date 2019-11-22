import React from 'react'

import RestaurantSummary from '../Components/RestaurantSummary'
import data from '../Components/data'

const RestaurantsScreen = () => {
  return (
    <div className='vert'>

      {
        data.results.map(restaurant => <RestaurantSummary
          key={restaurant.id}
          restaurant={{ ...restaurant }}
        />)
      }
    </div>
  )
}

export default RestaurantsScreen
