import React, { PropTypes, Component } from 'react'
import './games.css'

export default class Games extends Component {
  render() {
    const teamStyle = (team, otherTeam) => {
      const winner = parseInt(team.score) > parseInt(otherTeam.score)
      return {
        fontWeight: winner ? 'bold' : 'normal',
        color: winner ? '#ffffff' : 'inherit'
      }
    }

    return (
      <div>
        {this.props.games.map((game, i) =>
          <div key={i}
               onClick={() => this.props.onSelectGame(game)}
               className='game-row'>
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
                  <td style={{fontStyle: 'italic'}}>{game.status}</td>
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
