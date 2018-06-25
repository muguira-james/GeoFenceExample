import React from 'react';

export default class OutLinePointsDisplay extends React.Component {
  render() {
    return (
      <div>
        <textarea rows="10" cols="100" id={this.props.textArea}></textarea>
      </div>
    )
  }
}
