
import React from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';

import MapView from 'expo'

export default class InfoView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      titleText: "Lexi Thompson",
      bodyText: props.message,
    };
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }} >

        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>

          </View>
        </View>
        <View style={styles.drawerContainer}>
          <View style={styles.profilePicContainer}>
            <Image
              style={{
                flex: 1,
                alignSelf: 'stretch',
                width: undefined,
                height: undefined
              }}
              resizeMode="contain"
              source={require('./assets/lexi-thompson.png')}
              >
            </Image>
          </View>
            <View style={styles.playerInfoContainer}>
              <Text style={styles.baseText}>
                  <Text style={styles.titleText} onPress={this.onPressTitle}>
                    {this.state.titleText}{'\n'}{'\n'}
                  </Text>
                  <Text numberOfLines={5}>
                    {this.state.bodyText}
                  </Text>
              </Text>
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  drawerContainer: {
    flex: 1,
    borderRadius: 0,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  tempContainer: {
  	flex: 1,
  	backgroundColor: '#ff0',
  	justifyContent: 'flex-end'
  },
  searchBarContainer: {
  	height: 25,
  	backgroundColor: 'red',
  	justifyContent: 'center',
  },
  searchBar: {
  	height: 20,
  	borderRadius: 5,
  	backgroundColor: '#e7e2dc',
  	marginLeft: 5,
  	marginRight: 5,
  },
  profilePicContainer: {
  	flex: .45,
  	borderRadius: 2,
  	borderColor: '#e7e2dc',
  	borderWidth: 1,
  	marginTop: 10,
  	marginBottom: 10,
  	marginRight: 5,
  	marginLeft: 5,
  },
  baseText: {
    fontFamily: 'Cochin',
    marginTop: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  playerInfoContainer: {
  	flex: .55,
  }
});
