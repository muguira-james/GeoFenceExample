/**
Very small example of how to use a MapView, and marker

This employs a customer view for the Marker image AND positions the image
on the map using {lat, lng}

*/


import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Marker from 'react-native';
import { MapView } from 'expo';

const img = require('./assets/player.png')
// this is Kingsmill middle of the 1st hole on the farway
const p = {
  "latitude": 37.22944819712425,
  "longitude": -76.66792030817544,
  "latitudeDelta": 0.01,
  "longitudeDelta": 0.01,
};

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
      location: { coords: {latitude: p.latitude, longitude: p.longitude}},
      mapType: 'satellite',
    }
  }

  render() {
    let wp = {};
    wp.coordinate = {};
    wp.coordinate.latitude = p.latitude;
    wp.coordinate.longitude = p.longitude;

    let j = 'data:image/png' + img;
    console.log(j)
    return (
      <Expo.MapView
        style={styles.mapr}

        initialRegion={this.initialRegion}
        region={this.region}
        mapType={this.state.mapType}
        >
          <MapView.Marker coordinate={wp.coordinate}>

            <View>
            <Image source={{uri: 'http://localhost:8080/player'}} style={styles.stretch} />
            </View>
          </MapView.Marker>
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
