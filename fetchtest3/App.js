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

import {createStore} from 'redux';

var util = require('./utils.js')
import {addPlayer, updatePlayer} from './actions';
import positions from './reducers';

// const img = require('./assets/player.png')
// let latt = 37.25;
// let longg = -76.68;
// this is Kingsmill middle of the 1st hole on the farway
const p = {
  "latitude": 37.22944819712425,
  "longitude": -76.66792030817544,
  "latitudeDelta": 0.007,
  "longitudeDelta": 0.005,
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

// This works !!!!
let picon = [];
picon[0] = require('./assets/playericons/SUNG-HYUNPARK-ICON.png')
picon[1] = require('./assets/playericons/SO-YEONRYU-ICON.png')
picon[2] = require('./assets/playericons/BROOKE-HENDERSON-ICON.png')
picon[3] = require('./assets/playericons/IN-KYUNGKIM-ICON.png')

const store = createStore(positions);

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

    // console.log("players=",players, Object.keys(players))
    Object.keys(players).forEach(k => {
      let p = players[k]

      store.dispatch(addPlayer({
        id: p.properties.id,
        properties: p.properties
      }))
    })


  }


  onRegionChange(e) {
    // console.log("->", e.latitude, e.longitude);
    this.setState({region: e});

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

    // console.log("aa=", this.state.region);

    let plyrs = store.getState()

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
           {
             Object.keys(plyrs.positions).map((pt, index) => {
               // console.log("pt=", pt, plyrs.positions[pt].photo);
               let zOffSet = util.computeZoomOffSet(this.state.region)
               // console.log("z->", players[pt].properties.currentHole)
               let cHole = (players[pt].properties.currentHole - 1);
               let b = util.boxCalc(flagPoints[cHole].coordinate, zOffSet, index)
               // console.log("b=", index, zOffSet, b)
               return (
                 <Expo.MapView.Marker
                  coordinate={b}
                  key={index}
                  // image={plyrs.positions[pt].photo}
                  // this works !!
                  image={picon[index]}
               >
               </Expo.MapView.Marker>
             )})
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
  playerIcon: {
    width: 30,
    height: 30
  },
});
