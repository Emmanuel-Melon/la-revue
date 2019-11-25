import React, {
  useEffect,
  useState
} from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  OverlayView
} from 'react-google-maps'

const {
  compose,
  withStateHandlers
} = require('recompose')

// centers overlay
const getPixelPositionOffset = (height, width) => ({
  x: -(width / 2),
  y: -(height / 2),
})

const handleClick = e => {
  console.log('clicked!')
  // const { target } = e
  console.log(e)
}

// callback that sends back info to parent component?
const Map = (props) => {
  const {
    children,
    markers,
    location,
    zoom
  } = props


  // component has updated man!
  useEffect(() => {
    const { lat, lng } = location
    console.log(lat)
    console.log(lng)
  })

  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={{ lat: 0.32358400000000004, lng: 32.5935104 }}
      onClick={handleClick}
    >

      {markers.map(marker => {
        const { id, location } = marker
        return <Marker key={id} position={{ ...location }} />
      })}
      <OverlayView
        defaultCenter={{ lat: 0.32358400000000004, lng: 32.5935104 }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        {children}
      </OverlayView>
    </GoogleMap>
  )
}

const OverlayedMap = compose(
  withStateHandlers(() => ({
    selectedRestaurant: {},
  }), {
    onClick: ({ selectedRestaurant }) => () => ({
      //
    })
  }),
  withScriptjs,
  withGoogleMap
)(Map)

export default OverlayedMap
