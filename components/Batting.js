import React, { PropTypes, Component } from 'react'

export default class Batters extends Component {
  render() {
    return (
      <ul>
        {this.props.batters.map((batter, i) =>
          <li key={i}>{post.title}</li>
        )}
      </ul>
    )
  }
}

Batters.propTypes = {
  batters: PropTypes.array.isRequired
}
