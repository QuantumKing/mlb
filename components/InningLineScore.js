import React, { PropTypes, Component } from 'react'

export default class InningLineScore extends Component {
  render() {
    return (
      <ul>
        {this.props.inningLineScore.map((batter, i) =>
          <li key={i}>{batter.name}</li>
        )}
      </ul>
    )
  }
}

InningLineScore.propTypes = {
  inningLineScore: PropTypes.array.isRequired
}
