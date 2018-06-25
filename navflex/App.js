

import React from 'react';

import { StyleSheet, Text, View, Image, TouchableOpacity, Button, LayoutAnimation } from 'react-native';



import { MapView, Marker } from 'expo';
import { Constants, Location, Permissions } from 'expo';
import InfoView from './InfoView'

var golfCourse = require('./kingsmill.json')
// this is Kingsmill middle of the 1st hole on the farway
const initialRegion = {
  "latitude": 37.22808776269149,
  "longitude": -76.66821847329493,
  "latitudeDelta": 0.0003,
  "longitudeDelta": 0.0035
};
const url = "http://localhost:5000/active";

export default class App extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      titleText: "Lexi Thompson",
      bodyText: 'This is not really a bird nest.',
      region: initialRegion,
      mapType: 'satellite',
      serverUrl: url,
      store: null,
      flagClicked: false,
    }
  }


  handleFlagClick = (c) => {
    let s = "flag clicked="+ c;
    let r = Object.assign({}, initialRegion)
    r.latitudeDelta = 0.003
    r.longitudeDelta = 0.001

    this.setState({bodyText: s, flagClicked: true, region: r})
    // this.setState({flagClicked: true})
  }
  revert = () => {
    this.setState({bodyText: 'This is not a bird nest'})
    this.setState({flagClicked: false})
  }
  componentWillUpdate() {

    LayoutAnimation.easeInEaseOut();
  }
  render() {
    console.log("env->", process.env)
    let it = null;
    if (this.state.flagClicked != true) {
      it =
          <View style={{ flex: 1, flexDirection: 'column'}}>
              <View style={{ flex: 1}} >
                <Expo.MapView
                  style={{ flex: 1 }}
                  showsUserLocation={true}
                  initialRegion={this.props.initialRegion}
                  region={this.state.region}
                  mapType={this.state.mapType}
                  >
                  {
                    golfCourse.Features.map((wp, kIndex) => {
                     return (
                       <Expo.MapView.Marker
                         key={kIndex}
                         coordinate={wp.properties.FlagLocation}
                         onPress={() => { this.handleFlagClick(kIndex)}}
                       >
                       </Expo.MapView.Marker>
                     )})
                  }
                  </Expo.MapView>
                </View>

            </View>

    } 


    return (
      it

    )
  }


}


const styles = StyleSheet.create({

  mapr: {
    flex:1,
    flexDirection: 'column',
  },


});


/*

else {
      it = <View style={{ flex: 1, flexDirection: 'column'}}>
          <View style={{ flex: .70}} >
            <Expo.MapView
              style={{ flex: 1 }}
              showsUserLocation={true}
              initialRegion={this.props.initialRegion}
              region={this.state.region}
              mapType={this.state.mapType}
              onPress={() => this.revert()}
              >
              {
                golfCourse.Features.map((wp, kIndex) => {
                 return (
                   <Expo.MapView.Marker
                     key={kIndex}
                     coordinate={wp.properties.FlagLocation}
                     onPress={() => console.log("flag clicked=", kIndex)}
                   >
                   </Expo.MapView.Marker>
                 )})
              }
              </Expo.MapView>
            </View>
            <View style={{ flex: .3}} >
              <InfoView message={this.state.bodyText}/>
            </View>
        </View>
    }

    */