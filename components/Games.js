import React, { PropTypes, Component } from 'react'

export default class Games extends Component {
  render() {
    const rowStyle = {
      padding: '10px 5px',
      borderTop: '1px solid black',
      cursor: 'pointer'
    }

    return (
      <div>
        {this.props.games.map((game, i) =>
          <div key={i}
               onClick={() => this.props.onSelectGame(game)}
               style={rowStyle}>
            <div>{game.homeTeam.name}</div>
            <div>{game.awayTeam.name}</div>
            <div>{game.status}</div>
          </div>
        )}
      </div>
    )
  }
}

Games.propTypes = {
  games: PropTypes.array.isRequired,
  onSelectGame: PropTypes.func.isRequired
}
