import React from 'react'

const SearcRestaurants = () => {
  return (
    <div className='filter'>
      <h4 className='sub-header'>Filter by city</h4>
      <div className='search-body'>
        <div>
          <input type='text' placeholder='E.g Kampala' id='city' className='searchbar' />
        </div>
      </div>
    </div>
  )
}

export default SearcRestaurants
