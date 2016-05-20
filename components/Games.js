import React, { PropTypes, Component } from 'react'

export default class Games extends Component {
  render() {
    return (
      <ul>
        {this.props.games.map((game, i) =>
          <li key={i}>
            <div>{game.homeTeam.name}</div>
            <div>{game.awayTeam.name}</div>
            <div>{game.status}</div>
          </li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  games: PropTypes.array.isRequired
}
