
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
  Polygon
} from 'react-native';
import { Constants, Location, Permissions } from 'expo';

import Geofence from 'react-native-expo-geofence';

import AddPlace from './add_place';
import { MapView } from 'expo';
// import {createPolygonFromPoint, convertSq2Polygon, convertPoint2Sq } from './utils'
/*
timeout= how long does the API have to return a value before error is thrown
maximumAge=how old can the cache value be before I get another

maxAge=60,000 means item can sit in cache for a min, 1000 should be each sec
timeout=30,000 means API has 30 secs to return, 1000 should be each sec
*/
const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 };

var p = { latitude: 38.839454, longitude: -77.658044 }

var latOffSet = 0.0005;
var lngOffSet = 0.0005;

export default class App extends Component {
  constructor(props) {
    super(props)

    this.initialRegion = {  // this is over arlignton va
      latitude: p.latitude,
      longitude: p.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }

    this.state = {
      location: { coords: {latitude: p.latitude, longitude: p.longitude}},
      disResult: null,
      // location: { coords: {latitude: 38.83719, longitude: -77.08654}},
      errorMessage: null,
      inFence: 0,
      selectedTab: 0,
      mapType: 'satellite',

      wayPoints: [
        { latitude: 38.839454, longitude: -77.658044,
          visible: true, disResult: null,
          color: null
        },

        { latitude: 38.837734, longitude: -77.659563,
          visible: true, disResult: null,
          color: null
        },
        { latitude: 38.837586, longitude: -77.661732,
          visible: true, disResult: null,
          color: null
        },

        { latitude: 38.839531, longitude: -77.660562,
          visible: true, disResult: null,
          color: null
        }
      ]

      // wayPoints: [
      //   { latitude: 38.833202, longitude: -77.086843,
      //     visible: true, disResult: null,
      //     color: null
      //   },
      //
      //   { latitude: 38.831019, longitude: -77.086569,
      //     visible: false, disResult: null,
      //     color: null
      //   },
      //
      //   { latitude: 38.829231, longitude: -77.087518,
      //     visible: false, disResult: null,
      //     color: null
      //   },
      //
      //   { latitude: 38.829471, longitude: -77.088943,
      //     visible: false, disResult: null,
      //     color: null
      //   }
      // ]
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
  convertSq2Polygon(poly) {
    let topLeft = poly[0]

    let ropRight = {}
    topRight.latitude = poly[0].latitude
    topRight.longitude = (poly[0].longitude - lngOffSet)

    let bottomLeft = {}
    bottomLeft.latitude = (poly[0].latitude - latOffSet)
    bottomLeft.longitude = poly[0].longtiude

    let bottomRight = {}
    bottomRight.latitude = (poly[0].latitude - latOffSet)
    bottomRight.longitude = (poly[0].longitude - lngOffSet)

    return this._createPolygon(topLeft, topRight, bottomRight, bottomLeft)
  }

  // pt = { lat, lng }
  convertPoint2Sq(pt) {
    let topLeft = {}
    topLeft.latitude = (pt.latitude + latOffSet)
    topLeft.longitude = (pt.longitude - lngOffSet)

    let bottomRight = {}
    bottomRight.latitude = (pt.latitude - latOffSet)
    bottomRight.longitude = (pt.longitude + lngOffSet)

    z = []
    z.push(topLeft)
    z.push(bottomRight)
    return z
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

    let wayPoints = this.state.wayPoints
    wayPoints.forEach(pt => {
      sq = this.convertPoint2Sq(pt)
      result = Geofence.filterByProximity(point, sq, 0.1);
      if (result.length > 0) {
        this.setState({inFence: 1})
        pt.visible = 1
        msg += " V " + result.length + " " + sq[0].latitude
      } else {
        this.setState({inFence: 0})
        pt.visible = 0
        msg += " N " + result.distanceInKM + " " + sq[0].latitude
      }

      console.log("geo result = ", result, sq)
    })
    this.setState({ wayPoints: wayPoints })
    this.setState({errorMessage: msg})

    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
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
    let it = null
    let poly = {}
    let z = this.state.errorMessage
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

          {
            this.state.wayPoints.map((pt, index) => {
              poly = this.createPolygonFromPoint(pt)
              if (pt.visible === 0) {
                pt.color = 'rgba(0,52,0,0.7)'
                it = <View key={index} ><MapView.Polygon fillColor={pt.color} coordinates={poly} /></View>
              } else {
                pt.color = 'rgba(67,0,52, 0.5)'
                it = <View key={index} ><MapView.Polygon fillColor={pt.color} coordinates={poly} /></View>
              }
              return it
            })

           }
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
  }
});
