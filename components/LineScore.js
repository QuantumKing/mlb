import React, { PropTypes, Component } from 'react'

export default class LineScore extends Component {
  render() {
    const { game, lineScore } = this.props;
    const thStyle = {textAlign: 'left', padding: '0px 8px'}
    const tdStyle = {padding: '5px 8px 0 8px'}
    return (
      <table style={{marginLeft: '-8px', display: 'inline-block', textAlign: 'left'}}>
        <thead>
          <tr>
            <th style={thStyle}>&nbsp;</th>
            {lineScore.innings.map((score, i) =>
              <th key={i} style={thStyle}>
                {i}
              </th>
            )}
            <th style={thStyle}>&nbsp;</th>
            <th style={thStyle}>R</th>
            <th style={thStyle}>H</th>
            <th style={thStyle}>E</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={tdStyle}>{game.homeTeam.abbrev}</td>
            {lineScore.innings.map((score, i) =>
              <td key={i} style={tdStyle}>
                {score.home}
              </td>
            )}
            <td style={tdStyle}>&nbsp;</td>
            <td style={tdStyle}>{lineScore.runs.home}</td>
            <td style={tdStyle}>{lineScore.hits.home}</td>
            <td style={tdStyle}>{lineScore.errors.home}</td>
          </tr>

          <tr>
            <td style={tdStyle}>{game.awayTeam.abbrev}</td>
            {lineScore.innings.map((score, i) =>
              <td key={i} style={tdStyle}>
                {score.away}
              </td>
            )}
            <td style={tdStyle}>&nbsp;</td>
            <td style={tdStyle}>{lineScore.runs.away}</td>
            <td style={tdStyle}>{lineScore.hits.away}</td>
            <td style={tdStyle}>{lineScore.errors.away}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

LineScore.propTypes = {
  game: PropTypes.object.isRequired,
  lineScore: PropTypes.object.isRequired
}
