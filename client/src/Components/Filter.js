import React from 'react'

const FilterRestaurants = () => {
  return (
    <div className='filter'>
      <h3 className='sub-header'>Filter Reviews</h3>
      <div className='filter-body'>
        <div>
          <label htmlFor='id'>Min</label>
          <input type='text' placeholder='Min' id='min' />
        </div>
        <div>
          <label htmlFor='id'>Max</label>
          <input type='text' placeholder='Max' id='max' />
        </div>
      </div>
    </div>
  )
}

export default FilterRestaurants
