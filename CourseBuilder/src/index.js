import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MapContainer from './MapContainer';


// var initialCenter = {lat:40.661500, lng:-74.69871558715264};
var initialCenter = {lat:37.22808776269149, lng:-76.66821847329493};
const p = {
  "latitude": 37.22808776269149,
  "longitude": -76.66821847329493,
  "latitudeDelta": 0.0003,
  "longitudeDelta": 0.0035,
};

var mapType = 'satellite';

ReactDOM.render(
  <MapContainer
    initialCenter={initialCenter}
    mapType={mapType}
    zoomLevel={17}
  />,
  document.getElementById('root'));
