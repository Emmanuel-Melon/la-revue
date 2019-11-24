import React, { useState, useCallback } from 'react'
import { FaMapMarker, FaExpandArrowsAlt } from 'react-icons/fa'

/**
 * components
 */
import CustomButton from './CustomButton'
import CustomImage from './CustomImage'
import Rating from './Ratings'

/**
 * styles
 */
import styled from 'styled-components'
const RestaurantCard = styled.article`
  margin: 0.5em;
  background: #fff;
  padding: 0.5em;
  border-bottom: solid 0.2em rebeccapurple;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  overflow-wrap: break-word;
  transition: all .3s ease-in-out;
  
  &:hover {
    cursor: pointer;
  }
`

const RestaurantInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

const TagsArea = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Tag = styled.p`
  background: #eee;
  font-size: 18px;
  font-weight: 400;
  color: rebeccapurple;
  margin: 0.3em;
  padding: 0.3em;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all .3s ease-in-out;
  border: solid 0.2em #37104a;
  
  &:hover {
    transform: scale(1.1);
    background: gold;
   }
`

const RestaurantAction = styled.div`
  display: flex;
  align-items: center;
`

const Recommended = styled.span`
  background: gold;
  font-size: 18px;
  width: 40%;
  font-weight: 400;
  color: rgb(67,27,84);
  margin: 0.3em;
  padding: 0.3em;
  transition: all .3s ease-in-out;
  border: solid 0.2em #37104a;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

const Heading = styled.h3`
  color: #333;
`

/**
 * TODO: clicking on a restaurant should open a drawer with detail restaurant info, including imags, directions, etc
 * TODO: should also allow you to add a review
 * TODO: add UI messages
 * TODO: add image uploads
 * TODO: modify expandable component and give it expand directions!
 * TODO: expand other components from your place!
 * TODO: have an expandable overlay just like how Google does  underneath the map control options
 * @param props
 * @returns {*}
 * @constructor
 */
const RestaurantSummary = (props) => {
  const { restaurant } = props
  const { opening_hours } = restaurant

  const [data, handleClick] = useState(null)
  const click = useCallback(
    () => handleClick(prevState => {
      // set data to restaurant and pass over to other components
    }),
    []
  )
  return (
    <RestaurantCard onClick={click}>
      <RestaurantInfo>
        <div>
          <Heading>
            {restaurant.name} { opening_hours ? <span className='open'>Open</span> : <span className='closed'>Closed</span> }
          </Heading>
          <Rating rating={restaurant.rating} /> { restaurant.rating > 4 ? <Recommended>recommended</Recommended> : null}
          <p ><FaMapMarker /> {restaurant.vicinity}</p>
        </div>
        <div>
          <img src={restaurant.icon} alt='icon' />
        </div>
      </RestaurantInfo>
      <TagsArea>
        {
          restaurant.types.map(type => {
            return <Tag key={restaurant.types.indexOf(type)}>{type}</Tag>
          })
        }
      </TagsArea>
      <RestaurantAction>
        <CustomButton><FaExpandArrowsAlt /> View Restaurant</CustomButton>
      </RestaurantAction>
    </RestaurantCard>
  )
}

export default RestaurantSummary

/**
*/
