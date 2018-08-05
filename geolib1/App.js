import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Location, Permissions } from 'expo'

import geolib from 'geolib'

// this is arlington va, just go to google to get a point for your location.
let initialRegion = {
  "latitude": 38.833616,
  "longitude": -77.086599,
  "latitudeDelta": 0.0005,
  "longitudeDelta": 0.00001
}

/*
timeInterval is basically the poll time, BUT distanceInterval is how far you have to move to get
the device to poll.  In this case poll every sec (1000 ms), but first move 15 ft (5 m)
*/
const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 5 };

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      distance: 0,
      region: null
    }
  }

  // ask the device for permission to use location (iOS specific syntax)
  getPermissionAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      alert('Permission to access location was denied')
    }

  };
  // start the location service
  componentWillMount() {
    this.getPermissionAsync()
    // really, I should not "just flow into the next call" if we don't have permissions"
    this.clearLocation = Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  // stop the location service
  componentWillUnmount() {
    this.clearLocation.remove()
  }

  // callback to handle the changing location
  locationChanged = (location) => {

    // 1st, squirrel away the new location from the device poll
    let pt = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    }

    // now let's see how far we are from the initial center
    let dis = geolib.getDistance(
      { latitude: initialRegion.latitude, longitude: initialRegion.longitude },
      { latitude: location.coords.latitude, longitude: location.coords.longitude }
    );

    // update some textual info for the user to see
    it = dis + " " + JSON.stringify({ lat: location.coords.latitude, lng: location.coords.longitude })
    
    this.setState({ distance: it })
    this.setState({ region: pt })
  }

  render() {

    return (
      <View style={styles.outerContainer} >
        <MapView
          style={styles.container}
          mapType={'satellite'}
          initialRegion={initialRegion}
          region={this.state.region}
          showsUserLocation={true}

        />
        <Text style={styles.text}>{this.state.distance}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,

  },
  container: {
    flex: 1,

  },
  text: {
    fontSize: 20
  }
});
