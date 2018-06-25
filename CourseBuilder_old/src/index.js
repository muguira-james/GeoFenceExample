import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MapContainer from './MapContainer';


var initialCenter = { lat: 39.449689, lng: -74.468472 }
// trump national bedmister N.J.
// var initialCenter = {lat:40.661500, lng:-74.69871558715264};
var mapType = 'satellite';



// ReactDOM.render(<FileInput />, document.getElementById('root'));
ReactDOM.render(
  <MapContainer
    initialCenter={initialCenter}
    mapType={mapType}
  
    zoomLevel={17}
  />,
  document.getElementById('root'));
