import React, { useState, useContext } from 'react'

/**
 * components
 */
import { FaArrowDown, FaArrowUp, FaFilter } from 'react-icons/fa'
import SearchRestaurants from './Search'
import {
  Body,
  Header
} from './Expandable'

import API from '../Utils/api'
import { ContextConsumer } from "../Screens/Home";

/**
 * contexts
 */
import Expandable from './Expandable'

/**
 * styles
 */
import styled from 'styled-components'
const Filter = styled.section`
  background: #fff;
  margin-bottom: 5px;
  padding: 8px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`

const FilterBody = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const FilterInput = styled.input`
  border: none;
  padding: 8px;
  width: 45%;
  background: rgb(67,27,84);
  background: linear-gradient(90deg, rgba(67,27,84,1) 0%, rgba(55,16,74,1) 54%, rgba(14,32,79,1) 90%);
  color: gold;
  text-align: center;
  transition: all .3s ease-in-out;
  
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`

const FilterHeader = styled.h4`
color: #666666;
`

/**
 * @returns {*}
 * @constructor
 */
const FilterRestaurants = () => {
  const [min, updateMin] = useState(1)
  const [max, updateMax] = useState(5)
  const [error, setError] = useState(null)

  const handleMaxChange = e => {
    console.log(e.target.value)
    updateMax(e.target.value)
  }

  const handleMinChange = e => {
    console.log(e.target.value)
    updateMax(e.target.value)
  }

  return (
    <ContextConsumer>
      { context => {
        console.log(context)
        return (
          <Expandable>
            <Header>
              <FaFilter />
              Filter Restaurants
            </Header>
            <Body>
              <Filter>
                <FilterHeader>Filter by reviews</FilterHeader>
                <FilterBody>
                  <FilterInput type='number' onChange={handleMinChange} value={min} placeholder='Min 1' max={5} />
                  <FilterInput type='number' onChange={handleMaxChange} value={max} placeholder='Max 5' max={5} />
                </FilterBody>
                <div>
                  <button onClick={() => context.updateRestaurants(min, max)}>Filter</button>
                </div>
              </Filter>
            </Body>
          </Expandable>
        )
      }}
    </ContextConsumer>
  )
}

export default FilterRestaurants
