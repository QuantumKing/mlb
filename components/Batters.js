import React, { PropTypes, Component } from 'react'

export default class Batters extends Component {
  render() {
    const thStyle = {textAlign: 'left', padding: '0px 10px', color: '#ffffff'}
    const tdStyle = {padding: '5px 10px 0 10px'}
    return (
      <table style={{marginLeft: '-10px', display: 'inline-block', textAlign: 'left'}}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>AB</th>
            <th style={thStyle}>R</th>
            <th style={thStyle}>H</th>
            <th style={thStyle}>RBI</th>
            <th style={thStyle}>BB</th>
            <th style={thStyle}>SO</th>
            <th style={thStyle}>AVG</th>
          </tr>
        </thead>

        <tbody>
          {this.props.batters.map((batter, i) =>
            <tr key={i}>
              <td style={tdStyle}>{batter.name}</td>
              <td style={tdStyle}>{batter.ab}</td>
              <td style={tdStyle}>{batter.r}</td>
              <td style={tdStyle}>{batter.h}</td>
              <td style={tdStyle}>{batter.rbi}</td>
              <td style={tdStyle}>{batter.bb}</td>
              <td style={tdStyle}>{batter.so}</td>
              <td style={tdStyle}>{batter.avg}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

Batters.propTypes = {
  batters: PropTypes.array.isRequired
}
