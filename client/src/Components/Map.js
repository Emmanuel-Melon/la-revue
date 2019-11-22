import React from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

// default center should be dynamic
const positions = [
  { lat: 0.32358400000000004, lng: 32.5935104 },
  { lat: 0.3207221, lng: 32.5901075 },
  {
    lat: 0.3181999,
    lng: 32.5940854
  },
  {
    lat: 0.318562,
    lng: 32.593164
  }
]

const handleClick = () => {
  console.log('clicked!')
}

const Greeting = () => <h3>Hi!</h3>

const CustomSkinMap = withScriptjs(
  withGoogleMap(props => (
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
      <Greeting />
      {
        positions.map(position => {
          return <Marker position={{ ...position }} />
        })
      }
    </GoogleMap>
  ))
)


function Map ({ ...props }) {
  return (
    <CustomSkinMap
      googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyA1PTzMeDzmrxBbsROy9p1pirPxC74pQJc'
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  )
}

export default Map
