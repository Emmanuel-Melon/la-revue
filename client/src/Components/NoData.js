import React from 'react'

import styled from 'styled-components'
import CustomImage from './CustomImage'

const Wrapper = styled.div`
  background: #ffffff;
  padding: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  
  & p, h3 {
  text-align: center;
  }
`
const NoData = ({ message, image }) => {
  return (
    <Wrapper>
      <div>
        <h3>Oh mon Dieu!</h3>
        <CustomImage src={image} alt="Content not available"/>
        <p>{message}</p>
      </div>
    </Wrapper>
  )
}

export default NoData
