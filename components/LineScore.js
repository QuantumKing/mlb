import React, { PropTypes, Component } from 'react'

export default class LineScore extends Component {
  render() {
    const { game, lineScore } = this.props;
    const columnStyle = {display: 'inline-block', margin: '5px'}
    return (
      <div>
        <div style={Object.assign({}, columnStyle, {margin: '0 15px 0 0'})}>
          <div>&nbsp;</div>
          <div>{game.homeTeam.abbrev}</div>
          <div>{game.awayTeam.abbrev}</div>
        </div>
        {lineScore.innings.map((score, i) =>
          <div key={i} style={columnStyle}>
            <div style={{fontWeight: 'bold'}}>{i}</div>
            <div>{score.home}</div>
            <div>{score.away}</div>
          </div>
        )}
        <div style={Object.assign({}, columnStyle, {margin: '11px'})}>
          <div style={{fontWeight: 'bold'}}>R</div>
          <div>{lineScore.runs.home}</div>
          <div>{lineScore.runs.away}</div>
        </div>
        <div style={Object.assign({}, columnStyle, {margin: '11px'})}>
          <div style={{fontWeight: 'bold'}}>E</div>
          <div>{lineScore.errors.home}</div>
          <div>{lineScore.errors.away}</div>
        </div>
        <div style={Object.assign({}, columnStyle, {margin: '11px'})}>
          <div style={{fontWeight: 'bold'}}>H</div>
          <div>{lineScore.hits.home}</div>
          <div>{lineScore.hits.away}</div>
        </div>
      </div>
    )
  }
}

LineScore.propTypes = {
  game: PropTypes.object.isRequired,
  lineScore: PropTypes.object.isRequired
}
