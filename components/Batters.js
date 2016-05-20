import React, { PropTypes, Component } from 'react'

export default class Batters extends Component {
  render() {
    const { batters } = this.props
    const thStyle = {textAlign: 'left', padding: '0px 10px'}
    const tdStyle = {padding: '5px 10px 0 10px'}
    return (
      <table style={{marginLeft: '-10px'}}>
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

/*
      <div>
        <div style={Object.assign({}, columnStyle, {margin: '0 15px 0 0'})}>
          <div style={{fontWeight: 'bold'}}>Name</div>
          {batters.map((batter, i) =>
            <div key={i}>{batter.name}</div>
          )}
        </div>

        <div style={columnStyle}>
          <div style={{fontWeight: 'bold'}}>AB</div>
          {batters.map((batter, i) =>
            <div key={i} style={{textAlign: 'center'}}>{batter.ab}</div>
          )}
        </div>

        <div style={columnStyle}>
          <div style={{fontWeight: 'bold'}}>R</div>
          {batters.map((batter, i) =>
            <div key={i} style={{textAlign: 'center'}}>{batter.r}</div>
          )}
        </div>

        <div style={columnStyle}>
          <div style={{fontWeight: 'bold'}}>H</div>
          {batters.map((batter, i) =>
            <div key={i} style={{textAlign: 'center'}}>{batter.h}</div>
          )}
        </div>

        <div style={columnStyle}>
          <div style={{fontWeight: 'bold'}}>RBI</div>
          {batters.map((batter, i) =>
            <div key={i} style={{textAlign: 'center'}}>{batter.rbi}</div>
          )}
        </div>

        <div style={columnStyle}>
          <div style={{fontWeight: 'bold'}}>BB</div>
          {batters.map((batter, i) =>
            <div key={i} style={{textAlign: 'center'}}>{batter.bb}</div>
          )}
        </div>

        <div style={columnStyle}>
          <div style={{fontWeight: 'bold'}}>SO</div>
          {batters.map((batter, i) =>
            <div key={i} style={{textAlign: 'center'}}>{batter.so}</div>
          )}
        </div>

        <div style={columnStyle}>
          <div style={{fontWeight: 'bold'}}>AVG</div>
          {batters.map((batter, i) =>
            <div key={i} style={{textAlign: 'center'}}>{batter.avg}</div>
          )}
        </div>
      </div>*/
