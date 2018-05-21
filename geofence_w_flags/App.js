
/*
Display a set of geofenced area from a a data structure.

Uses Location services from the phone.

This is written for Expo.io.  The MapView and Polygon are Expo.io entities.

Expo.io uses AirBnB's react-native-map

*/
import React, { Component } from 'react';
import {
  Alert,
  Platform,
  Text,
  TabBarIOS,
  View,
  StyleSheet,
  Polygon,
  Image
} from 'react-native';
import { Constants, Location, Permissions, AppLoading } from 'expo';

import Geofence from 'react-native-expo-geofence';

import AddPlace from './add_place';
import { MapView, Marker } from 'expo';
// import {createPolygonFromPoint, convertSq2Polygon, convertPoint2Sq } from './utils'
/*
timeout= how long does the API have to return a value before error is thrown
maximumAge=how old can the cache value be before I get another

maxAge=60,000 means item can sit in cache for a min, 1000 should be each sec
timeout=30,000 means API has 30 secs to return, 1000 should be each sec
*/
const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 };

// Haymarket Va
// var p = { latitude: 38.839454, longitude: -77.658044 }
// greensboro dr
// var p = { latitude: 38.925161, longitude: -77.232729 }
// arlington
var p = { latitude: 38.833202, longitude: -77.086843 }

var latOffSet = 0.0005;    // this is about an 1/8 mile
var lngOffSet = 0.0005;

let flags = []


export default class App extends Component {
  constructor(props) {
    super(props)

    this.initialRegion = {
      latitude: p.latitude,
      longitude: p.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }

    this.state = {
      isReady: false,
      location: { coords: {latitude: p.latitude, longitude: p.longitude}},
      disResult: null,
      region: this.initialRegion,
      // location: { coords: {latitude: 38.83719, longitude: -77.08654}},
      errorMessage: null,
      inFence: 0,
      selectedTab: 0,
      mapType: 'satellite',

      // greensboro dr, tysons
      // wayPoints: [
      //   { coordinate: { latitude: 38.925161, longitude:  -77.232729 },
      //       visible: false, disResult: null, color: null
      //   },
      //   { coordinate: { latitude: 38.926048, longitude:  -77.232049 },
      //       visible: false, disResult: null, color: null
      //   },
        // { coordinate:
        //   { latitude: 38.925310, longitude:  -77.229756},
        //     visible: false, disResult: null, color: null
        // },
        // { coordinate:
        //   { latitude: 38.924207, longitude:  -77.227273},
        //     visible: false, disResult: null, color: null
        // },
        // { coordinate:
        //   { latitude: 38.922844, longitude:  -77.227566},
        //     visible: false, disResult: null, color: null
        // },
      // ]

      // haymarket Va
      // wayPoints: [
      //   { latitude: 38.839454, longitude: -77.658044,
      //     visible: true, disResult: null,
      //     color: null
      //   },
      //
      //   { latitude: 38.837734, longitude: -77.659563,
      //     visible: true, disResult: null,
      //     color: null
      //   },
      //   { latitude: 38.837586, longitude: -77.661732,
      //     visible: true, disResult: null,
      //     color: null
      //   },
      //
      //   { latitude: 38.839531, longitude: -77.660562,
      //     visible: true, disResult: null,
      //     color: null
      //   }
      // ]

      // Arlington Va
      wayPoints: [
        { coordinate: {latitude: 38.833202, longitude: -77.086843 },
          visible: true, disResult: null,
          color: null
        },

        { coordinate: {latitude: 38.831019, longitude: -77.086569},
          visible: false, disResult: null,
          color: null
        },

        { coordinate: {latitude: 38.829231, longitude: -77.087518},
          visible: false, disResult: null,
          color: null
        },

        { coordinate: {latitude: 38.829471, longitude: -77.088943},
          visible: false, disResult: null,
          color: null
        },
        { coordinate: {latitude: 38.839471, longitude: -77.088943},
          visible: false, disResult: null,
          color: null
        },
        { coordinate: {latitude: 38.829231, longitude: -77.084518},
          visible: false, disResult: null,
          color: null
        },
        { coordinate: {latitude: 38.729231, longitude: -77.084518},
          visible: false, disResult: null,
          color: null
        },
        { coordinate: {latitude: 38.829231, longitude: -77.024518},
          visible: false, disResult: null,
          color: null
        }
      ]
    }

  }

  // generate an array of {lat, lng} objects
  //
  // notice last object closes the polygon
  _createPolygon(topLeft, topRight, bottomRight, bottomLeft) {
    resultPolygon = []
    resultPolygon.push(topLeft)     // 1
    resultPolygon.push(topRight)    // 2
    resultPolygon.push(bottomRight) // 3
    resultPolygon.push(bottomLeft)  // 4
    resultPolygon.push(topLeft)     // 5

    return resultPolygon
  }

  // pt = { lat, lng }
  createPolygonFromPoint(pt) {
    let topLeft = {}
    topLeft.latitude = (pt.latitude + latOffSet)
    topLeft.longitude = (pt.longitude - lngOffSet)

    let topRight = {}
    topRight.latitude = (pt.latitude + latOffSet)
    topRight.longitude = (pt.longitude + lngOffSet)

    let bottomRight = {}
    bottomRight.latitude = (pt.latitude - latOffSet)
    bottomRight.longitude = (pt.longitude + lngOffSet)

    let bottomLeft = {}
    bottomLeft.latitude = (pt.latitude - latOffSet)
    bottomLeft.longitude = (pt.longitude - lngOffSet)

    z = this._createPolygon(topLeft, topRight, bottomRight, bottomLeft)
    return z
  }

  // poly = [ {let, lng}, {lat, lng} ]
  // convertSq2Polygon(poly) {
  //   let topLeft = poly[0]
  //
  //   let ropRight = {}
  //   topRight.latitude = poly[0].latitude
  //   topRight.longitude = (poly[0].longitude - lngOffSet)
  //
  //   let bottomLeft = {}
  //   bottomLeft.latitude = (poly[0].latitude - latOffSet)
  //   bottomLeft.longitude = poly[0].longtiude
  //
  //   let bottomRight = {}
  //   bottomRight.latitude = (poly[0].latitude - latOffSet)
  //   bottomRight.longitude = (poly[0].longitude - lngOffSet)
  //
  //   return this._createPolygon(topLeft, topRight, bottomRight, bottomLeft)
  // }

  // pt = { lat, lng }
  convertPoint2Sq(pt) {
    var topLeft = {}
    topLeft.latitude = (pt.latitude + latOffSet)
    topLeft.longitude = (pt.longitude - lngOffSet)

    var bottomRight = {}
    bottomRight.latitude = (pt.latitude - latOffSet)
    bottomRight.longitude = (pt.longitude + lngOffSet)

    var z = []
    z.push(topLeft)
    z.push(bottomRight)
    // console.log("bottom Right==", topLeft, bottomRight)
    return z
  }

  // callback to handle the changing location
  locationChanged = (location) => {
    let result = null
    let msg = "M"
    let sqr = null

    let point = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }

    /*
    Loop through the wayPoints
      check if we are close to any point
        if so... mark it
    */
    let wayPoints = this.state.wayPoints
    wayPoints.forEach(poit => {
      sqr = this.convertPoint2Sq(poit.coordinate)
      // console.log("sq = ", sqr, poit)
      result = Geofence.filterByProximity(point, sqr, 0.1);
      if (result.length > 0) {
        this.setState({inFence: 1})  // inFence does not really do anything, should remove
        poit.visible = 1
        msg += " V " + result.length + " " + sqr[0].latitude
      } else {
        this.setState({inFence: 0})
        poit.visible = 0
        msg += " N " + result.distanceInKM + " " + sqr[0].latitude
      }

      console.log("geo result = ", result, sqr)
    })
    this.setState({ wayPoints: wayPoints })
    this.setState({errorMessage: msg})

    point.latitudeDelta= 0.005
    point.longitudeDelta = 0.005

    this.setState({location, point})
    this.setState({region: point})
    this.setState({disResult: result})
  }

  askPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status != 'granted') {
      Alert("not allowed to use location")
    }
  }
  // start the location service
  componentWillMount() {
    this.askPermission()
    this.clearLocation = Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  // stop the location service
  componentWillUnmount() {
    this.clearLocation.remove()
  }

  _loadAssetsAsync = async () => {
    flags[0] = require('./assets/Hole1.png')
    flags[1] = require('./assets/Hole2.png')
    flags[2] = require('./assets/Hole3.png')
    flags[3] = require('./assets/Hole4.png')
    flags[4] = require('./assets/Hole5.png')
    flags[5] = require('./assets/Hole6.png')
    flags[6] = require('./assets/Hole7.png')
    flags[7] = require('./assets/Hole8.png')
  }
  // handle changing from Favorrite screen to text screen
  handleTabPress(tab) {
    this.setState({ selectedTab: tab })
  }

  // render the app
  render() {
    let it = null
    let poly = {}
    let z = this.state.errorMessage

    // if (this.state.isReady  === false) {
    //   return (
    //     <AppLoading
    //       startAsync={() => {this._loadAssetsAsync()}}
    //       onFinish={() => this.setState({ isReady: true })}
    //       onError={console.warn}
    //     />
    //   )
    // }
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
            // initialRegion={this.initialRegion}
            region={this.state.region}
            mapType={this.state.mapType}
            >
            <View>
          {

            this.state.wayPoints.map((pt, index) => {
              poly = this.createPolygonFromPoint(pt.coordinate)
              if (pt.visible === 0) {
                pt.color = 'rgba(0,52,0,0.7)'
                it = <View key={index} >
                      <MapView.Polygon fillColor={pt.color} coordinates={poly} />
                        <MapView.Marker
                          key={index}
                          coordinate={pt.coordinate} >
                            <Image source={flags[index]} style={styles.flagSize} />
                        </MapView.Marker>

                      </View>
              } else {
                pt.color = 'rgba(67,0,52, 0.5)'
                it = <View key={index} >
                        <MapView.Polygon fillColor={pt.color} coordinates={poly} />
                          <MapView.Marker
                            key={index}
                            coordinate={pt.coordinate} >
                              <Image source={flags[index]} style={styles.flagSize} />
                          </MapView.Marker>
                      </View>
              }
              return it
            })

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
  circle1: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: 'red'
  },
  circle2: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: 'green'
  },
  flagSize: {
    width:30,
    height:30
  }
});
