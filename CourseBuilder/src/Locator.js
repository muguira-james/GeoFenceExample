import React from 'react';


export default class Locator extends React.Component {
  // constructor(props) {
  //   super(props)
  //   console.log("props-->", props)
  // }
  render() {
    return (
      <div>

        <button key={this.props.ikey} id={this.props.name} onClick={this.props.handleClick}>{this.props.name}</button>
        <input id={this.props.type} />
        
      </div>
    )
  }
}
