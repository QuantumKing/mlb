import React, { Component, PropTypes } from 'react'

export default class TeamTabBar extends Component {
  render() {
    const {
      teams,
      defaultTeam,
      onChange
    } = this.props;

    const tabStyle = {
      display: 'inline-block',
      margin: '0 25px 0 0',
      cursor: 'pointer'
    }

    const selectedTabStyle = Object.assign({}, tabStyle, {
      fontWeight: 'bold',
      textDecoration: 'underline',
      cursor: 'auto'
    })

    const homeTeamTabStyle = defaultTeam.flag === 'home' ? selectedTabStyle : tabStyle
    const awayTeamTabStyle = defaultTeam.flag === 'away' ? selectedTabStyle : tabStyle

    return (
      <div style={{margin: '20px 0', fontSize: '1.2em'}}>
        <div style={homeTeamTabStyle} onClick={() => onChange(teams[0])}>
          {teams[0].name}
        </div>
        <div style={awayTeamTabStyle} onClick={() => onChange(teams[1])}>
          {teams[1].name}
        </div>
      </div>
    )
  }
}

TeamTabBar.propTypes = {
  teams: PropTypes.array.isRequired,
  defaultTeam: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}
