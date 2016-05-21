import React, { PropTypes, Component } from 'react'

export default class Games extends Component {
  render() {
    const rowStyle = {
      padding: '10px 5px',
      borderTop: '1px solid black',
      cursor: 'pointer'
    }

    const teamStyle = (team, otherTeam) => {
      return {
        fontWeight: (team.score > otherTeam.score) ? 'bold' : 'normal'
      }
    }

    return (
      <div>
        {this.props.games.map((game, i) =>
          <div key={i}
               onClick={() => this.props.onSelectGame(game)}
               style={rowStyle}>
            <table style={{width: '100%'}}>
              <tbody>
                <tr style={teamStyle(game.homeTeam, game.awayTeam)}>
                  <td>{game.homeTeam.name}</td>
                  <td style={{textAlign: 'right'}}>{game.homeTeam.score}</td>
                </tr>
                <tr style={teamStyle(game.awayTeam, game.homeTeam)}>
                  <td>{game.awayTeam.name}</td>
                  <td style={{textAlign: 'right'}}>{game.awayTeam.score}</td>
                </tr>
                <tr>
                  <td>{game.status}</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
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
