import React, { useState, useCallback } from 'react'

/**
 * components
 */
import { FaFilter, FaExpand } from 'react-icons/fa'
import {
  Body,
  Header
} from './Expandable'

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

const FilterButton = styled.p`
  border: none;
  padding: 8px;
  width: 25%;
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
const AddReview = () => {
  return (
    <Expandable>
      <Header>
        <FaExpand />
        View Restaurant
      </Header>
      <Body>
        <Filter>
          <FilterBody>
            <input type='text' placeholder='review body' />
          </FilterBody>
        </Filter>
      </Body>
    </Expandable>
  )
}

export default AddReview
