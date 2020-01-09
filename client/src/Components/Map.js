import React, {
  useEffect
} from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  OverlayView
} from 'react-google-maps'

import {
  compose
} from 'recompose'

import { ContextConsumer } from '../Screens/Home'

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2)
})

// custom styles to make Overlay static
const Map = ({ children }) => {
  useEffect(() => {
  }, [])

  return (
    <ContextConsumer>
      { context => {
        {
          const { zoom, location, onMapClick, markers, onOverlayClick } = context
          return (
            <GoogleMap
              defaultZoom={zoom}
              defaultCenter={{ lat: 0.32358400000000004, lng: 32.5935104 }}
              onClick={onMapClick}
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
