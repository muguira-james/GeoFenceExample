/**
Very small example of how to use a MapView, and marker

This employs a customer view for the Marker image AND positions the image
on the map using {lat, lng}

This is an experiment to see how zooming works

Place 30 players on the map
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
//"latitude": 37.22944819712425,
// "longitude": -76.66792030817544,
const p = {
  "latitude": 37.22808776269149,
  "longitude": -76.66821847329493,
  "latitudeDelta": 0.00025,
  "longitudeDelta": 0.0025,
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

picon[4] = require('./assets/playericons/SUNG-HYUNPARK-ICON.png')
picon[5] = require('./assets/playericons/SO-YEONRYU-ICON.png')
picon[6] = require('./assets/playericons/BROOKE-HENDERSON-ICON.png')
picon[7] = require('./assets/playericons/IN-KYUNGKIM-ICON.png')

picon[8] = require('./assets/playericons/SUNG-HYUNPARK-ICON.png')
picon[9] = require('./assets/playericons/SO-YEONRYU-ICON.png')
picon[10] = require('./assets/playericons/BROOKE-HENDERSON-ICON.png')
picon[11] = require('./assets/playericons/IN-KYUNGKIM-ICON.png')

picon[12] = require('./assets/playericons/SUNG-HYUNPARK-ICON.png')
picon[13] = require('./assets/playericons/SO-YEONRYU-ICON.png')
picon[14] = require('./assets/playericons/BROOKE-HENDERSON-ICON.png')
picon[15] = require('./assets/playericons/IN-KYUNGKIM-ICON.png')

picon[16] = require('./assets/playericons/SUNG-HYUNPARK-ICON.png')
picon[17] = require('./assets/playericons/SO-YEONRYU-ICON.png')
picon[18] = require('./assets/playericons/BROOKE-HENDERSON-ICON.png')
picon[19] = require('./assets/playericons/IN-KYUNGKIM-ICON.png')

picon[20] = require('./assets/playericons/SUNG-HYUNPARK-ICON.png')
picon[21] = require('./assets/playericons/SO-YEONRYU-ICON.png')
picon[22] = require('./assets/playericons/BROOKE-HENDERSON-ICON.png')
picon[23] = require('./assets/playericons/IN-KYUNGKIM-ICON.png')

picon[24] = require('./assets/playericons/SUNG-HYUNPARK-ICON.png')
picon[25] = require('./assets/playericons/SO-YEONRYU-ICON.png')
picon[26] = require('./assets/playericons/BROOKE-HENDERSON-ICON.png')
picon[27] = require('./assets/playericons/IN-KYUNGKIM-ICON.png')

picon[28] = require('./assets/playericons/SUNG-HYUNPARK-ICON.png')
picon[29] = require('./assets/playericons/SO-YEONRYU-ICON.png')
picon[30] = require('./assets/playericons/BROOKE-HENDERSON-ICON.png')
picon[31] = require('./assets/playericons/IN-KYUNGKIM-ICON.png')

picon[32] = require('./assets/playericons/SUNG-HYUNPARK-ICON.png')
picon[33] = require('./assets/playericons/SO-YEONRYU-ICON.png')
picon[34] = require('./assets/playericons/BROOKE-HENDERSON-ICON.png')
picon[35] = require('./assets/playericons/IN-KYUNGKIM-ICON.png')



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
    let i=0;
    let plyrs = store.getState()
    Object.keys(plyrs.positions).forEach((pt) => {
      players[pt].photo = picon[i++]
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
    let index = 0;
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

             Object.keys(plyrs.positions).map((pt, keyIndex) => {
               let coord = {};
               coord.coordinate = {};

               let zOffSet = util.computeZoomOffSet(this.state.region)
               // console.log("z->", players[pt].properties.currentHole)
               let cHole = (players[pt].properties.currentHole - 1);
               let plyr = players[pt].properties
               if (plyr.locationOnHole === "tee") {
                 coord.coordinate.latitude = golfCourse.Features[cHole].properties.TeeLocation.lat
                 coord.coordinate.longitude = golfCourse.Features[cHole].properties.TeeLocation.lng
               } else if (plyr.locationOnHole === "fairway") {
                 coord.coordinate.latitude = golfCourse.Features[cHole].properties.labelLocation.lat
                 coord.coordinate.longitude = golfCourse.Features[cHole].properties.labelLocation.lng

               } else if (plyr.locationOnHole === "green") {
                 coord.coordinate.latitude = golfCourse.Features[cHole].properties.FlagLocation.lat
                 coord.coordinate.longitude = golfCourse.Features[cHole].properties.FlagLocation.lng

               }
               console.log("coord=", index, coord.coordinate)
               let b = util.boxCalc(coord.coordinate, zOffSet, index)
               index = index + 1
               if (index > 3) {
                 index = 0
               }
               // console.log("b=", index, zOffSet, b)
               return (
                 <Expo.MapView.Marker
                  coordinate={b}
                  key={keyIndex}
                  // image={plyrs.positions[pt].photo}
                  // this works !!
                  image={players[pt].photo}
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
