import React from 'react';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const HoleEditor = 
  withScriptjs(withGoogleMap((props) => {
  // console.log("HE->", props.holeConfig)
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
        let markerLabel = null
        if (keyIndex < 3) {
          markerLabel = '#'
        } else {
          markerLabel = labels[keyIndex % labels.length]
        }
          return (
            <Marker 
                key={200 + keyIndex}
                draggable={true}
                onDragEnd={(e) => {props.dragMarker(e, k)} }
                position={props.holeConfig.properties[k]}
                label={markerLabel}
            />
          )
      })
        
    }
    
    </GoogleMap>
  )}))




  export default HoleEditor

