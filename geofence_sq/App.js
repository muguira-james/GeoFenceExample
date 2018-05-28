
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
import { Constants, Location, Permissions, AppLoading } from 'expo';


import util from './utils'

import { MapView } from 'expo';
// import {createPolygonFromPoint, convertSq2Polygon, convertPoint2Sq } from './utils'
/*
timeout= how long does the API have to return a value before error is thrown
maximumAge=how old can the cache value be before I get another

maxAge=60,000 means item can sit in cache for a min, 1000 should be each sec
timeout=30,000 means API has 30 secs to return, 1000 should be each sec
*/
const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 };

// var p = { latitude: 38.839454, longitude: -77.658044 }
// this is over tysons va

var p = { latitude: 38.925278, longitude: -77.231988 }
const initialRegion = {
  latitude: p.latitude,
  longitude: p.longitude,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
}


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mapType: 'satellite',
      region: initialRegion,
      isReady: false,
      wayPoints: [
        { latitude: 38.833202, longitude: -77.086843 },

        { latitude: 38.831019, longitude: -77.086569},

        { latitude: 38.829231, longitude: -77.087518},

        { latitude: 38.829471, longitude: -77.088943}
      ],
    }

  }


  // callback to handle the changing location
  locationChanged = (location) => {
    let point = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    }
    this.setState({region: point})
  }

  _askPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
  }
  // ?start the location service
  componentWillMount() {
    this._askPermission()
    this.clearLocation = Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  // stop the location service
  componentWillUnmount() {
    this.clearLocation.remove()
  }

  // handle changing from Favorrite screen to text screen
  handleTabPress = (tab) => {
    this.setState({ selectedTab: tab })
  }

  handleRegionChange = (r) => {
    console.log("rz->", r)
    // let region = {
    //   latitude: r.latitude,
    //   longitude: r.longitude,
    //   latitudeDelta: 0.03,
    //   longitudeDelta: 0.03,
    // }
    this.setState({region: r})
  }
  _asyncLoading= async () => {
    // this.setState({region: initialRegion})
  }
  // render the app
  render() {
    let it = null
    let poly = {}
    console.log("r->", this.state.region)
    if (this.state.isReady === false) {
      return (
        <AppLoading
          startAsync={this._asyncLoading}
          onFinish={() => {this.setState({isReady: true}) }}
        />
      )
    }
    return (
        <View style={styles.outerContainer} >
          <Expo.MapView
            style={styles.mapr}

            showsUserLocation={true}
            // initialRegion={this.initialRegion}
            region={this.state.region}
            mapType={this.state.mapType}
            // onRegionChange={(r) => {this.handleRegionChange(r)}}
            >


          </Expo.MapView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mapr: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  outerContainer: {
    position: "absolute",
    width: '100%',
    height: '100%',
  },
});
