import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const HoleEditor = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultZoom={16}
      defaultOptions={{
        // defaultCenter: {lat: -34.397, lng: 150.644 },
        
        mapTypeId: 'satellite',//google.maps.MapTypeId.SATELLITE,
      }}
      defaultCenter={ props.initialCenter }
      onClick={(e) => {
        //   console.log("on click", e.latLng.lat(), e.latLng.lng()) 
          props.mapClick(e.latLng)
      }}
    >
    {
        Object.keys(props.holeConfig.properties).map((k, keyIndex) => {
            // console.log("k->", k, props.holeConfig[k])
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
    }
    </GoogleMap>
  )}))




  export default HoleEditor

