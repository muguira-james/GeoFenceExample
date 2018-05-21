import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const Stomp = require('stomp');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      client: null,

      subscription: null,
      subscribed: false,
      // url: "ws://ec2-35-170-130-193.compute-1.amazonaws.com:61614/stomp",
      url: "ws://localhost:61614/stomp",
      q: "/topic/JAMtopic",
      headers : {
        login: 'guest',
        passcode: 'guest',
        // additional header
        // 'client-id': 'my-client-id'
      },
    }

    this.connectError = this.connectError.bind(this);
    this.connectCallback = this.connectCallback.bind(this);
    this.subCallback = this.subCallback.bind(this);
  }

  connectError() {
    console.log("in error logger")
  }

  // after client.subscribe success, this callback is driven each time a new message comes in
  subCallback(msg) {
    // console.log("in consumer")
    if (msg.body) {
      let z = JSON.parse(msg.body)
      // let m = this.state.messages.concat(z)

      console.log("got message ----->: ", z, this.state)
      
    } else {
      console.log("msg error: ", msg)
    }
  }

  // after client.connect, this call back starts the subscription process
  connectCallback() {
    // if you want to just use queues use this line
    // var subscription = client.subscribe("/queue/testJAM", function(msg) {
    // console.log("ConCallBack -->", this.state)
    var subscription = this.state.client.subscribe(this.state.q, this.subCallback)
    this.setState( { subscription: subscription } )
    this.setState( {subscribed: true} )
    // store.subscribe(this.render.bind(this))
  }

  // provide a disconnect from websocket call
  mydisconnect() {
    this.state.client.disconnect(function() { console.log("see you later")})
  }


  componentWillMount() {

    console.log("DFV: comp will mount", Stomp.Stomp.client);
    let it = Stomp.Stomp.client(this.state.url)
    this.setState( {client: it})
  }
  componentDidMount() {


    this.state.client.connect(this.state.headers, this.connectCallback, this.connectError);
    console.log(this.state.players)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
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
