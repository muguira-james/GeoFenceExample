/**
Very small example of how to use a MapView, and marker

This employs a customer view for the Marker image AND positions the image
on the map using {lat, lng}

This is an experiment to see how zooming works
*/


import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Marker from 'react-native';
import { MapView } from 'expo';

const img = require('./assets/player.png')
let latt = 37.25;
let longg = -76.68;
// this is Kingsmill middle of the 1st hole on the farway
const p = {
  "latitude": 37.22944819712425,
  "longitude": -76.66792030817544,
  "latitudeDelta": 0.01,
  "longitudeDelta": 0.01,
};

let _mapView: MapView;

const holes = [];
holes[0] = require('./assets/img/Hole1.png')
holes[1] = require('./assets/img/Hole2.png')
holes[2] = require('./assets/img/Hole3.png')
holes[3] = require('./assets/img/Hole4.png')
holes[4] = require('./assets/img/Hole5.png')
holes[5] = require('./assets/img/Hole6.png')
holes[6] = require('./assets/img/Hole7.png')
holes[7] = require('./assets/img/Hole8.png')
holes[8] = require('./assets/img/Hole9.png')
holes[9] = require('./assets/img/Hole10.png')
holes[10] = require('./assets/img/Hole11.png')
holes[11] = require('./assets/img/Hole12.png')
holes[12] = require('./assets/img/Hole13.png')
holes[13] = require('./assets/img/Hole14.png')
holes[14] = require('./assets/img/Hole15.png')
holes[15] = require('./assets/img/Hole16.png')
holes[16] = require('./assets/img/Hole17.png')
holes[17] = require('./assets/img/Hole18.png')


var golfCourse = require('./kingsmill.json')
var players = require('./tempPlayers.json')


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.initialRegion = {  // this is over arlignton va
      latitude: p.latitude,
      longitude: p.longitude,
      latitudeDelta: p.latitudeDelta,
      longitudeDelta: p.longitudeDelta,
    }

    this.state = {
      region: null,
      mapType: 'satellite',
    }

  }


  onRegionChange(e) {
    console.log("->", e.latitude, e.longitude)
    this.setState({region: e})

    if (e.longitudeDelta <= 0.0009) {
      console.log("zoom changed: 20", e.longitudeDelta)
    }
    if ((e.longitudeDelta >= 0.0009) && (e.longitudeDelta <= 0.0017)) {
      console.log("zoom changed: 19", e.longitudeDelta)
    }
    if ((e.longitudeDelta >= 0.0017) && (e.longitudeDelta <= 0.002)) {
      console.log("zoom changed: 18", e.longitudeDelta)
    }
    if ((e.longitudeDelta >= 0.002) && (e.longitudeDelta <= 0.003)) {
      console.log("zoom changed: 17", e.longitudeDelta)
    }
    if ((e.longitudeDelta >= 0.003) && (e.longitudeDelta <= 0.004)) {
      console.log("zoom changed: 16", e.longitudeDelta)
    }
    if ((e.longitudeDelta >= 0.004) && (e.longitudeDelta <= 0.005)) {
      console.log("zoom changed: 15", e.longitudeDelta)
    }
  }

  render() {
    let wp = {};
    wp.coordinate = {};
    wp.coordinate.latitude = p.latitude;
    wp.coordinate.longitude = p.longitude;

    let flagPoints = []
    golfCourse.Features.forEach((h) => {
      let ob = {}
      ob.coordinate = {}
      ob.coordinate.latitude = h.properties.FlagLocation.lat
      ob.coordinate.longitude = h.properties.FlagLocation.lng

      // console.log("c=",ob)
      flagPoints.push(ob)
    })

    return (


        <Expo.MapView

          style={styles.mapr}

          initialRegion={this.initialRegion}
          // region={this.state.region}
          mapType={this.state.mapType}
          // maxDelta={0.1}
          onRegionChangeComplete={(e) => this.onRegionChange(e)}
          >
          <View>
        {

          flagPoints.map((wp, index) => {
           // console.log(wp)
           return (
             <Expo.MapView.Marker
               key={index}
               coordinate={wp.coordinate}
               style={styles.marker}
               image={holes[index]}
               onPress={() => {console.log("Flag CLICK=",index) }}
             >
             </Expo.MapView.Marker>
           )
          })
         }


         </View>
        </Expo.MapView>



    );
  }
}

/**
 stretch = the size of the player ICON
 mapr = tells flex to fill the screen with the map
 */
const styles = StyleSheet.create({

  stretch: {
    width: 40,
    height: 40
  },
  mapr: {
    flex: 1
  },
});
