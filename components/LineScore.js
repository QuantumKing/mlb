import React, { PropTypes, Component } from 'react'

export default class LineScore extends Component {
  render() {
    const { game, lineScore } = this.props;
    const thStyle = {textAlign: 'left', padding: '0px 8px'}
    const tdStyle = {padding: '5px 8px 0 8px'}
    return (
      <table style={{marginLeft: '-8px'}}>
        <thead>
          <tr>
            <th style={thStyle}>&nbsp;</th>
            <th style={thStyle}>1</th>
            <th style={thStyle}>2</th>
            <th style={thStyle}>3</th>
            <th style={thStyle}>4</th>
            <th style={thStyle}>5</th>
            <th style={thStyle}>6</th>
            <th style={thStyle}>7</th>
            <th style={thStyle}>8</th>
            <th style={thStyle}>9</th>
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

/*
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
      </div>*/
