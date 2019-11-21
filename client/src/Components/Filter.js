import React from 'react'

const FilterRestaurants = () => {
  return (
    <div className='filter'>
      <h4 className='sub-header'>Filter by reviews</h4>
      <div className='filter-body'>
        <div>
          <label htmlFor='id'>Min</label>
          <input className='filters' type='text' placeholder='Min' id='min' />
        </div>
        <div>
          <label htmlFor='id'>Max</label>
          <input className='filters' type='text' placeholder='Max' id='max' />
        </div>
      </div>
    </div>
  )
}

export default FilterRestaurants
