import React from 'react'
import styled from 'styled-components'

const ReviewBody = styled.article`
  border: solid 0.2em #37104a;
  padding: 0.5em;
  display: flex;
`

const ReviewUser = styled.div`
flex: 1;
`

const ReviewContent = styled.div`
flex: 2;
`
const ReviewSummary = (props) => {
  console.log(props)
  return (
    <ReviewBody>
      <ReviewUser>
        <h3>Anyonmous</h3>
      </ReviewUser>
      <ReviewContent>
        <p>{props.name}</p>
      </ReviewContent>
    </ReviewBody>
  )
}

export default ReviewSummary
