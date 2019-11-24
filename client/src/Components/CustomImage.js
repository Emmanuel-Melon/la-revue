import React from 'react'

import styled from 'styled-components'
const Image = styled.img`
  width: 100%;
  height: auto;
`

/**
 *
 * @param src
 * @param alt
 * @returns {*}
 * @constructor
 */
const CustomImage = ({ src, alt }) => {
  return <Image src={src} alt={alt} />
}

export default CustomImage
