import React from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

const FilterRestaurants = () => {
  return (
    <div className='filter'>
      <h4 className='sub-header'>Filter by reviews</h4>
      <div className='filter-body'>
        <div>
          <label htmlFor='id'><FaArrowDown /> Min</label>
          <input className='filters' type='text' placeholder='Min' id='min' />
        </div>
        <div>
          <label htmlFor='id'> <FaArrowUp /> Max</label>
          <input className='filters' type='text' placeholder='Max' id='max' />
        </div>
      </div>
    </div>
  )
}

export default FilterRestaurants
