import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


var groups = [];

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { text:  "hello James"}
  }
  componentDidMount() {

  }
  render() {

    var url = "http://localhost:8080/api/locatorboards/groups";

    fetch(url)
      .then((resp) => {
        // console.log("r->", resp);
        return resp.json()
      })

      .then(function(data) {
        // console.log("d->",data.GolfDataFeed.Tournament.Locatorboard.Group)
        pp = {}
        groups = data.GolfDataFeed.Tournament.Locatorboard.Group;
        for (j=0; j<2; j++) {
          d = groups[j]
          for (z=0; z<2; z++) {
            p = d.Player[z]

            pp[p.ID] = p

          }

        }
        console.log("pp->", pp)
        // this.setState({text: groups})
      })
      .catch(function(error) {
        console.log("Error:-->", error)
      })
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
