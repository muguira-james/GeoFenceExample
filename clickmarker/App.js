
/*
Display a set of geofenced area from a a data structure.

Uses Location services from the phone.

This is written for Expo.io.  The MapView and Polygon are Expo.io entities.

Expo.io uses AirBnB's react-native-map

wayPoints.map((wp, index) => {
 console.log(wp)
 return (
   <Expo.MapView.Marker
     key={index}
     coordinate={wp.coordinate}
     style={styles.marker}
     image={holes[index]}
     onPress={() => {console.log("CLICK=",index) }}
   >
   </Expo.MapView.Marker>
 )

 <View>
   <Image source={{uri: 'http://localhost:8080/playerBrook'}} style={styles.playerIcon}/>
 </View>
})

*/
import React, { Component } from 'react';
import {createStore} from 'redux';
import {
  Image,
  Platform,
  Text,
  TabBarIOS,
  View,
  StyleSheet,
  Polygon,

} from 'react-native';

import { Constants, Location, Permissions } from 'expo';

import Marker from 'react-native';

import { MapView } from 'expo';


import {addPlayer, updatePlayer} from './actions';
import positions from './reducers';


const store = createStore(positions);

var golfCourse = require('./kingsmill.json')
var players = require('./tempPlayers.json')

/*
  Yes, I know this is terrible!

  However, by doing this method, these images load very fast across the Javascript bridge!
*/
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


// const BrookHenderson = require('./assets/playericons/BROOKE-HENDERSON-ICON.png');
// ];

/*
timeout= how long does the API have to return a value before error is thrown
maximumAge=how old can the cache value be before I get another

maxAge=60,000 means item can sit in cache for a min, 1000 should be each sec
timeout=30,000 means API has 30 secs to return, 1000 should be each sec
*/
const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 };

// Haymarket VA
// var p = { latitude: 38.839454, longitude: -77.658044 }
// greensboro dr
// var p = { latitude: 38.925161, longitude: -77.232729 }
var p = golfCourse.initialRegion;

export default class App extends Component {
  constructor(props) {
    super(props)

    this.initialRegion = {  // this is over arlignton va
      latitude: p.latitude,
      longitude: p.longitude,
      latitudeDelta: p.latitudeDelta,
      longitudeDelta: p.longitudeDelta,
    }

    this.state = {
      location: { coords: {latitude: p.latitude, longitude: p.longitude}},
      disResult: null,
      // location: { coords: {latitude: 38.83719, longitude: -77.08654}},
      errorMessage: null,
      inFence: 0,
      selectedTab: 0,
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
    // console.log("A: con:", store.getState(), players[9000].properties)

  }


  // callback to handle the changing location
  locationChanged = (location) => {
    let result = null
    let msg = "M"
    let sq = null

    let point = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }



    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }

    this.setState({location, region})
    this.setState({disResult: result})
  }

  // start the location service
  componentWillMount() {
    this.clearLocation = Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  // stop the location service
  componentWillUnmount() {
    this.clearLocation.remove()
  }

  // handle changing from Favorrite screen to text screen
  handleTabPress(tab) {
    this.setState({ selectedTab: tab })
  }

  // render the app
  render() {
    let wayPoints = []
    golfCourse.Features.forEach((h) => {
      let ob = {}
      ob.coordinate = {}
      ob.coordinate.latitude = h.properties.FlagLocation.lat
      ob.coordinate.longitude = h.properties.FlagLocation.lng

      // console.log("c=",ob)
      wayPoints.push(ob)
    })
    console.log("store=", store.getState())
    let plyrs = store.getState()
    let z = "hello"
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon="favorites"
          selected={this.state.selectedTab === 0}
          onPress={this.handleTabPress.bind(this, 0)}
        >
          <Expo.MapView
            style={styles.mapr}
            showsUserLocation={true}
            initialRegion={this.initialRegion}
            region={this.region}
            mapType={this.state.mapType}
            >

            <View>
          {

            wayPoints.map((wp, index) => {
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
               console.log("pt=", pt, plyrs.positions[pt].photo);
               return (
                 <Expo.MapView.Marker
                  coordinate={wayPoints[index].coordinate}
                  key={index}
               >
               <View>
                <Image source={{uri: plyrs.positions[pt].photo}} style={styles.playerIcon} />
               </View>
               </Expo.MapView.Marker>

             )})
}

           </View>

          </Expo.MapView>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Info"
          icon={require('./assets/pin.png')}
          selected={this.state.selectedTab === 1}
          onPress={this.handleTabPress.bind(this, 1)}
        >
          <Text style={styles.text}  >{z}</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 50,
  },
  view: {
    backgroundColor: '#fed',
    flex: 1
  },
  mapr: {
    flex: 1
  },
  marker: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 1,
    height: 1
  },
  playerIcon: {
    width: 30,
    height: 30
  }
});
