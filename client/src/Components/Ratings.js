
import React, { Component } from 'react'
import Ratings from 'react-ratings-declarative'

class Rating extends Component {
  render () {
    return (
      <Ratings
        rating={this.props.rating}
        widgetRatedColors='#37104a'
        widgetDimensions='20px'
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
    )
  }
}

export default Rating
