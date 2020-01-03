import React, { useState } from 'react'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import CustomButton from './CustomButton'

import { ContextConsumer } from '../Screens/Home'

const Wrapper = styled.section`
    background: #ffffff;
  padding: 1.5em;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border: solid 0.2em #37104a;
  margin-top: 0.5em;
  max-width: 450px;
`

const Input = styled.input`
  display: block;
  width: 95%;
  margin-bottom: 0.5em;
  padding: 0.5em;
  border: solid 0.1em #37104a;
`

const Success = styled.p`
  background: rgba(49,215,36,0.48);
  padding: 0.5em;
`

const Error = styled.p`
  background: rgba(215,0,21,0.6);
  padding: 0.5em;
`

const AddRestaurant = props => {
  const [name, setName] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const addRestaurant = async (e) => {
    try {
      // create a new restaurant
      console.log(e.target)
      const restaurant = {
        name,
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
        types: [
          "restaurant",
          "food",
          "point_of_interest",
          "establishment"
        ],
        vicinity: "Kampala",
        rating: 5
      }
      await props.addRestaurant(restaurant)
      setName('')
      setSuccessMessage('Restaurant Added')
    } catch (error) {
      setErrorMessage(error)
    }
  }

  const handleInputChange = e => {
    const { target: { value } } = e
    setName(value);
  }

  return (
    <ContextConsumer>
      { context => {
        // context is null
        console.log(context)
        return (
          <Wrapper>
            <h3>Add Restaurant</h3>
            <p>You have to reload the page in order for new restaurants to show :(</p>
            <Input
              type='text'
              placeholder='restaurant name'
              value={name} onChange={handleInputChange}
              name='restaurant'
            />
            { successMessage === '' ? null : <Success>{successMessage}</Success> }
            { errorMessage === '' ? null : <Error>{errorMessage}</Error> }
            <CustomButton onClick={(e) => addRestaurant(e)}><FaPlus /> Add Restaurant</CustomButton>
          </Wrapper>
        )
      }}
    </ContextConsumer>
  )
}

export default AddRestaurant
