import React, { Component } from 'react';
import {
  AlertIOS,
  Text,

  View,
  TouchableHighlight,
  StyleSheet,
  Linking
} from 'react-native';

import MapView from 'expo';

export default class PlaceMap extends Component {
  constructor(props) {
    super(props);
    this.region = {
      latitude: 38.8977,
      longitude: -77.0365,
      latitudeDelta: 0.02,
      longitudeDelta: 0.2,
      title: "White House"
    }
  }

  handleNavigation(la, lo) {
    const rla = this.region.latitude;
    const rlo = this.region.longitude;
    const url = `http://maps.apple.com/?saddr=${rla},${rlo}&daddr=${la},${lo}&dirflg=d`;
    return Linking.openURL(url);
  }

  componentWillMount() {
    // Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  // locationChanged = (location) => {
  //   region = {
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //     latitudeDelta: 0.00922*1.5,
  //     longitudeDelta: 0.00421*1.5,
  //   },
  //   this.setState({location, region})
  // }

  render() {
    const { annotations } = this.props;
    annotations.forEach(annotation => {
      annotation.rightCalloutView = (
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleNavigation.bind(this, annotation.latitude, annotation.longitude)}
        >
          <Text style={styles.buttonText}>Navigation</Text>
        </TouchableHighlight>
      );
    })
    return (
      <Expo.MapView
        style={styles.map}
        region={this.region}
        annotations={annotations}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  button: {
    backgroundColor: 'red',
    padding: 5,
    margin: 5
  },
  buttonText: {
    fontSize: 12,
    color: 'white'
  }
});
