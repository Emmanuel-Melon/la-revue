import React from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  OverlayView
} from 'react-google-maps'

const { compose, withProps, withStateHandlers } = require('recompose')

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2)
})

const handleClick = (e) => {
  console.log('clicked!')
  console.log(e)
}

const CustomSkinMap = withScriptjs(
  withGoogleMap(props => {
    const { markers } = props
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 0.32358400000000004, lng: 32.5935104 }}
        onClick={handleClick}
        defaultOptions={{
          scrollwheel: false,
          zoomControl: true,
          styles: [
            {
              featureType: 'water',
              stylers: [
                { saturation: 43 },
                { lightness: -11 },
                { hue: '#0088ff' }
              ]
            },
            {
              featureType: 'road',
              elementType: 'geometry.fill',
              stylers: [
                { hue: '#ff0000' },
                { saturation: -100 },
                { lightness: 99 }
              ]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#808080' }, { lightness: 54 }]
            },
            {
              featureType: 'landscape.man_made',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ece2d9' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ccdca1' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#767676' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#ffffff' }]
            },
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
            {
              featureType: 'landscape.natural',
              elementType: 'geometry.fill',
              stylers: [{ visibility: 'on' }, { color: '#b8cb93' }]
            },
            { featureType: 'poi.park', stylers: [{ visibility: 'on' }] },
            {
              featureType: 'poi.sports_complex',
              stylers: [{ visibility: 'on' }]
            },
            { featureType: 'poi.medical', stylers: [{ visibility: 'on' }] },
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'simplified' }]
            }
          ]
        }}

      >
        {
          markers.map(marker => {
            const { id, location } = marker
            return <Marker key={id} position={{ ...location }} />
          })
        }

        <OverlayView
          position={{ lat: -34.397, lng: 150.644 }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={getPixelPositionOffset}
        >
          <div style={{ background: `white`, border: `1px solid #ccc`, padding: 15 }}>
            <h1>OverlayView</h1>
            <button onClick={props.onClick} style={{ height: 60 }}>
              I have been clicked {props.count} time{props.count > 1 ? `s` : ``}
            </button>
          </div>
        </OverlayView>
      </GoogleMap>
    )
  })
)

function Map ({ ...props }) {
  return (
    <CustomSkinMap
      googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyA1PTzMeDzmrxBbsROy9p1pirPxC74pQJc'
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      markers={props.markers}
    />
  )
}

export default Map
