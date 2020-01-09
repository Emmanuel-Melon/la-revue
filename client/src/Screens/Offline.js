import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.main`
  background: white;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Offline = () => {
  return (
    <Wrapper>
      <div>
        <h3>Seems like you're offline!</h3>
      </div>
    </Wrapper>
  )
}

export default Offline
