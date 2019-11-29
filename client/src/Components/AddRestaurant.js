import React, { useState } from 'react'
import styled from 'styled-components'
import { FaKeyboard } from 'react-icons/fa'
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
  const [name, setName] = useState('le')
  const [type, setType] = useState('ad')
  const [error, setError] = useState(null)

  const addRestaurant = async () => {
    try {
      console.log('adding restaurant!')
      const api = new API({
        resource: 'restaurants/add',
        source: 'base'
      })

      await api.postData({
        name,
        type
      })
    } catch (error) {
      setError(error)
    }
  }

  const handleInputChange = e => {
    //
    console.log('handling change')
    console.log(e)
  }

  return (
    <Wrapper>
      <h3>Add Restaurant</h3>
      <Input type='text' placeholder='restaurant name' value={name} onChange={handleInputChange} />
      <Input type='text' placeholder='establishment type' value={type} onChange={handleInputChange} />
      <CustomButton onClick={addRestaurant}><FaKeyboard /> Add Restaurant</CustomButton>
    </Wrapper>
  )
}

export default AddRestaurant
