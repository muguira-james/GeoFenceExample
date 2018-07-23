import React from 'react';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const HoleEditor = 
  withScriptjs(withGoogleMap((props) => {
  // console.log("HE->", props.holeConfig)
  return (
    <GoogleMap
      defaultZoom={16}
      defaultOptions={{
        // defaultCenter: {lat: -34.397, lng: 150.644 },
        
        mapTypeId: 'satellite',//google.maps.MapTypeId.SATELLITE,
      }}
      defaultCenter={ props.region }
      region={props.region}
      ref={(r) => props.onMapMounted(r)}
      onClick={(e) => {
        //   console.log("on click", e.latLng.lat(), e.latLng.lng()) 
          props.mapClick(e.latLng)
      }}
    >
    {
      Object.keys(props.holeConfig.properties).map((k, keyIndex) => {
        // console.log("k->", k, props.holeConfig.properties[k])
          return (
            <Marker 
                key={200 + keyIndex}
                draggable={true}
                onDragEnd={(e) => {props.dragMarker(e, k)} }
                position={props.holeConfig.properties[k]}
            />
          )
      })
        
    }
    
    </GoogleMap>
  )}))




  export default HoleEditor

