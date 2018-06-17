import React, { Component } from 'react';


export default class GeneralButton extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleClick}>{this.props.name}</button>
      </div>
    )
  }
}
