import React, { useState, useContext, useReducer, useEffect } from 'react'

/**
 * components
 */
import { FaArrowDown, FaArrowUp, FaFilter } from 'react-icons/fa'
import {
  Body,
  Header
} from './Expandable'

import { Context } from '../Screens/Home'

/**
 * contexts
 */
import Expandable from './Expandable'

/**
 * styles
 */
import styled from 'styled-components'
const Filter = styled.section`
  background: rgb(67,27,84);
  background: linear-gradient(90deg, rgba(67,27,84,1) 0%, rgba(55,16,74,1) 54%, rgba(14,32,79,1) 90%);
  margin-bottom: 5px;
  padding: 8px;
  border-bottom: solid 0.2em rebeccapurple;
  color: gold;
`

const FilterBody = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const FilterInput = styled.input`
  border: none;
  padding: 8px;
  width: 20%;
  color: #333333;
  text-align: center;

`


/**
 * @returns {*}
 * @constructor
 */
const FilterRestaurants = ({ restaurants }) => {

  const [min, updateMin] = useState(1)
  const [max, updateMax] = useState(5)

  const { updateRestaurants } = useContext(Context)

  const handleMaxChange = e => {
    updateRestaurants({type: 'increment', payload: {
        min,
        max: e.target.value
      }})
    updateMax(e.target.value)
  }


  const handleMinChange = e => {
    updateRestaurants({ type: 'decrement', payload: {
      min: e.target.value,
        max
      } })
    updateMin(e.target.value)
  }

  return (
    <Expandable>
      <Header>
        <FaFilter />
        Filter Restaurants
      </Header>
      <Body>
        <Filter>
          <FilterBody>
            <label><FaArrowDown/> Min</label>
            <FilterInput type='number' id="min" onChange={handleMinChange} value={min} placeholder='Min 1' min="0" max="5" />
            <label><FaArrowUp/> Max</label>
            <FilterInput type='number' id="max" onChange={handleMaxChange} value={max} placeholder='Max 5' min="0" max="5" />
          </FilterBody>
        </Filter>
      </Body>
    </Expandable>
  )
}

export default FilterRestaurants
