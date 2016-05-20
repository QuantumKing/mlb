import React, { PropTypes, Component } from 'react'

export default class LineScore extends Component {
  render() {
    return (
      <ul>
        {this.props.lineScore.innings.map((score, i) =>
          <li key={i}>{score.home}</li>
        )}
      </ul>
    )
  }
}

LineScore.propTypes = {
  lineScore: PropTypes.object.isRequired
}
