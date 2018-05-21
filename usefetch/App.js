import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import {createStore} from 'redux';
import {addPlayer, updatePlayer} from './actions';
import positions from './reducers';

var groups = [];

const store = createStore(positions);

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text:  "hello James",
      ready: false,
    }
    this.getInitalData = this.getInitalData.bind(this)
    this.getData = this.getData.bind(this)
  }


  getInitalData() {


  }

  getData() {
    return Promise.all( [this.getInitalData] )
  }

  componentWillMount() {
    // var url = "http://localhost:8080/api/locatorboards/groups";
    var url = 'http://localhost:8080/api/locatorboards/players/active';
    var pp = {};

    fetch(url)
      .then((resp) => {
        // console.log("r->", resp);
        return resp.json()
      })
      .then((data) => {

        groups = data.GolfDataFeed.Tournament.Locatorboard.Player
        // console.log(groups)
        // for (i=0; i<2; i++) {
          // console.log("-->", groups[i])
        groups.forEach((plyr) => {
          ind = plyr.ID
          p = {}
          p.properties = plyr
          console.log("iii--->", ind, p)
          store.dispatch(addPlayer({
            id: ind,
            properties: p
          }))
        })


        this.setState({ready: true})
      })
      .catch(function(error) {
        console.log("Error:-->", error)
      })
  }

  render() {


    let n = ""
    let players = store.getState()
    Object.keys(players.positions).forEach((pt) => {
      console.log("n->", players.positions[pt])
      n += players.positions[pt].properties.FirstName
    })
    console.log("players-->", this.state.ready, players.positions)

    if (this.state.ready === true) {
      return (
        <View style={styles.container}>
          <Text>n your app!</Text>
          <TextInput
            style={{height: 40}}
            value={n}
            />

        </View>
      )

    } else {
    return (

      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <TextInput
          style={{height: 40}}
          onChangeText={(text) => {this.setState({text})}}
          value={this.state.text}
          />

      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// .then(function(data) {
//   // console.log("d->",data.GolfDataFeed.Tournament.Locatorboard.Group)
//   pp = {}
//   groups = data.GolfDataFeed.Tournament.Locatorboard.Group;
//   for (j=0; j<2; j++) {
//     d = groups[j]
//     for (z=0; z<2; z++) {
//       p = d.Player[z]
//
//       pp[p.ID] = p
//
//     }
//
//   }
//   console.log("pp->", pp)
//   // this.setState({text: groups})
// })
