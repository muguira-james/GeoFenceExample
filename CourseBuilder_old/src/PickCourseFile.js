import React, { Component } from 'react';


export default class PickACourse extends Component {


  render() {
    return (
      <div>
        <label>Choose a Course File: </label>
          <input type="file" id="input" onChange={this.props.handleReadCourseFile} >
          </input>

      </div>
    )
  }
}
