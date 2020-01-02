import React from 'react'
import styled from 'styled-components'
import Empty from './undraw_page_not_found_su7k.svg'
import CustomImage from '../Components/CustomImage'
const Wrapper = styled.div`
  display: flex;
  background: white;
  padding: 1.5em;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`

const NotFound = () => {
  return (
    <Wrapper>
      <Content>
        <div>
          <h1>Not Found</h1>
          <p>The page you're looking for is not available on our servers.</p>
        </div>
      </Content>
      <div>
        <CustomImage src={Empty} alt='not available' />
      </div>
    </Wrapper>
  )
}

export default NotFound
