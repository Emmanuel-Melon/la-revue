import React, { Component } from 'react'

import styled from 'styled-components'

const Root = styled.div`
`

class RestaurantSkeleton extends Component{

  constructor(props) {
    super(props);
    this.state = {
      content: false
    };
  }

  render() {
    return <Root>{this.props.children}</Root>
  }
}

export default RestaurantSkeleton
