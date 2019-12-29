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

import {
  compose,
  withStateHandlers
} from 'recompose'

import { ContextConsumer } from '../Screens/Home'

const getPixelPositionOffset = (height, width) => {
  // ! hard coded values
  return ({ x: width - 650, y: -280 })
}

// callback that sends back info to parent component?
const Map = ({ children }) => {
  // component has updated man!
  // center={new google.maps.LatLng(lat, lng)}
  // update center
  useEffect(() => {
  }, [])

  // {lat: 0.32358400000000004, lng: 32.5935104}

  return (
    <ContextConsumer>
      { context => {
        {
          const { zoom, location, onMapClick, markers, onOverlayClick } = context
          return (
            <GoogleMap
              defaultZoom={zoom}
              defaultCenter={{ lat: 0.32358400000000004, lng: 32.5935104 }}
            >

              <OverlayView
                position={{ lat: 0.32358400000000004, lng: 32.5935104 }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={getPixelPositionOffset}
                onOverlayClick={onOverlayClick}
              >
                {children}
              </OverlayView>
              {markers && markers.map(marker => {
                const { id, location } = marker
                return <Marker key={id} position={{ ...location }} />
              })}

            </GoogleMap>
          )
        }
      }}
    </ContextConsumer>
  )
}

const OverlayedMap = compose(
  withScriptjs,
  withGoogleMap
)(Map)

export default OverlayedMap

/**

 */
