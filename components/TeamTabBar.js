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
      cursor: 'pointer'
    }

    const selectedTabStyle = Object.assign({}, tabStyle, {
      fontWeight: 'bold',
      textDecoration: 'underline',
      cursor: 'auto'
    })

    const team0TabStyle = defaultTeam === teams[0] ? selectedTabStyle : tabStyle
    const team1TabStyle = defaultTeam === teams[1] ? selectedTabStyle : tabStyle

    return (
      <div style={{margin: '20px 0', fontSize: '1.2em', textAlign: 'center'}}>
        <div style={team0TabStyle} onClick={() => onChange(teams[0])}>
          {teams[0].name}
        </div>
        <div
          style={Object.assign({}, team1TabStyle, {marginLeft: '40px'})}
          onClick={() => onChange(teams[1])}>
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
