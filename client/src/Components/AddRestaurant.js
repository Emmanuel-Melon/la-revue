import React, { useState } from 'react'
import styled from 'styled-components'
import { FaKeyboard, FaPlus } from 'react-icons/fa'
import CustomButton from './CustomButton'
import API from '../Utils/api'

const Wrapper = styled.section`
    background: #ffffff;
  padding: 1.5em;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border: solid 0.2em #37104a;
  margin-top: 0.5em;
`

const Input = styled.input`
  display: block;
  width: 95%;
  margin-bottom: 0.5em;
  padding: 0.5em;
  border: solid 0.1em #37104a;
`

const AddRestaurant = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState(null)

  const addRestaurant = async () => {
    try {
      console.log('adding restaurant!')
      const api = new API({
        resource: 'restaurants/add',
        source: 'base'
      })

      const response = await api.postData({
        name
      })
      console.log(response)
    } catch (error) {
      setError(error)
    }
  }

  const handleInputChange = e => {
    const { target: { value } } = e
    setName(value);
  }

  return (
    <Wrapper>
      <h3>Add Restaurant</h3>
      <Input
        type='text'
        placeholder='restaurant name'
        value={name} onChange={handleInputChange}
        name='restaurant'
      />
      <CustomButton onClick={() => addRestaurant()}><FaPlus /> Add Restaurant</CustomButton>
    </Wrapper>
  )
}

export default AddRestaurant
