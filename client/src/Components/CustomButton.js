import React from 'react'

import styled from 'styled-components'
const Button = styled.button`
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  background: rgb(67,27,84);
  background: linear-gradient(90deg, rgba(67,27,84,1) 0%, rgba(55,16,74,1) 54%, rgba(14,32,79,1) 90%);
  width: 420px;
  padding: 8px;
  color: gold;
  border-radius: 0.2em;
  font-size: 18px;
  border: solid 0.1em rgb(91,9,172);
  margin: 0.5em;
  
  &:hover {
    cursor: pointer;
  }
`

const CustomButton = ({ children }) => {
  return <Button>
    {children}
  </Button>
}

export default CustomButton
