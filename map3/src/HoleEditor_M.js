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
          console.log("on click", e.latLng.lat(), e.latLng.lng()) 
          props.mapClick(e.latLng)
      }}
    >
    {
        props.aListoHoles.map((j, indx) => {
            return ( [
                <Marker 
                    key={indx}
                    draggable={true} 
                    onDragEnd={(e) => {props.dragTeeMarker(e, j)} }
                    position={j.TeeLocation} 
                /> ,
                <Marker 
                    key={indx+1} 
                    draggable={true} 
                    onDragEnd={(e) => {props.dragFairwayMarker(e, j)} }
                    position={j.FairwayLocation} 
                />,
                <Marker 
                    key={indx+2} 
                    draggable={true} 
                    onDragEnd={(e) => {props.dragGreenMarker(e, j)} }
                    position={j.FlagLocation} 
                />
            ])
        })
    }
    </GoogleMap>
  )}))




  export default HoleEditor

