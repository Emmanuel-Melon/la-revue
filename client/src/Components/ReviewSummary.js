import React from 'react'
import styled from 'styled-components'

import Rating from './Ratings'
import CustomImage from './CustomImage'
import Moment from 'moment'

import { FaUserAlt } from 'react-icons/fa'

const ReviewBody = styled.article`
  display: flex;
`

const ReviewContent = styled.div`
  & div {
    padding-left: 0.1em;
  }
  flex: 2;
`

const ReviewUser = styled.div`
  padding-left: 0.3em;
  flex: 1;
  
  & p {
  text-align: center;
  }
`

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ReviewSummary = ({ review }) => {
  return (
    <ReviewBody>
      <ReviewUser>
        <Avatar>
          <FaUserAlt size='3em' />
        </Avatar>
        <p>Anonymous</p>
      </ReviewUser>
      <ReviewContent>
        <div>
          <p>{review.text}</p>
          <p>{Moment(review.timestamp).calendar()}</p>
        </div>
      </ReviewContent>
    </ReviewBody>
  )
}

export default ReviewSummary
