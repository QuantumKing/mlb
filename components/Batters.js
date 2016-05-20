import React, { PropTypes, Component } from 'react'

export default class Batters extends Component {
  render() {
    const { batters } = this.props
    const columnStyle = {display: 'inline-block', margin: '5px'}
    return (
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
      </div>
    )
  }
}

Batters.propTypes = {
  batters: PropTypes.array.isRequired
}
