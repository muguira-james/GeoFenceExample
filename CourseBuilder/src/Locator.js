import React from 'react';


export default class Locator extends React.Component {
  render() {
    return (
      <div>

        <button onClick={this.props.handleClick}>{this.props.name}</button>
        <input id={this.props.type} />
      </div>
    )
  }
}
