import React from 'react'

/**
 * styles
 */
import styled from 'styled-components'
const SearchBar = styled.input`
  width: 98%;
  border: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  padding: 8px;
  font-size: 18px;
  background: rgb(67,27,84);
  background: linear-gradient(90deg, rgba(67,27,84,1) 0%, rgba(55,16,74,1) 54%, rgba(14,32,79,1) 90%);
  color: gold;
`

const Wrapper = styled.div`
  margin-bottom: 0.5em;
`

/**
 *
 * @returns {*}
 * @constructor
 */
const SearchRestaurants = () => {
  return (
    <Wrapper>
      <h4 className='sub-header'>Filter by city</h4>
      <div>
        <SearchBar type='text' placeholder='E.g Kampala' id='city' />
      </div>
    </Wrapper>
  )
}

export default SearchRestaurants
