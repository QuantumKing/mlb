import React, { Component } from 'react'

export default class ErrorDisplay extends Component {
  render() {
    return (
      <div style={{padding: '10px', color: 'red', textAlign: 'center'}}>
        {this.props.error.message}
      </div>
    )
  }
}
