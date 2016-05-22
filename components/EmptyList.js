import React, { Component } from 'react'

export default class EmptyList extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <div style={{marginBottom: '10px'}}>No games today...</div>
        <div><img width="300" style={{borderRadius: '2px', marginBottom: '5px'}}
          src="http://cimg.tvgcdn.net/i/r/2013/10/15/e4bf68ce-a7ea-424c-b1b6-a6bd74d5c758/thumbnail/624x447/b2bbccf7a276e17afe76aa53e55a5170/crying-face-dawson1.jpg" /></div>
      </div>
    )
  }
}
