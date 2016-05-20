import React, { PropTypes, Component } from 'react'

export default class Games extends Component {
  render() {
    return (
      <ul>
        {this.props.games.map((game, i) =>
          <li key={i} onClick={() => this.props.onSelectGame(game)}>
            <div>{game.homeTeam.name}</div>
            <div>{game.awayTeam.name}</div>
            <div>{game.status}</div>
          </li>
        )}
      </ul>
    )
  }
}

Games.propTypes = {
  games: PropTypes.array.isRequired,
  onSelectGame: PropTypes.func.isRequired
}
