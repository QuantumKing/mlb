import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ListView from '../containers/ListView'
import DetailView from '../containers/DetailView'

class App extends Component {
  render() {
    const { selectedGame } = this.props

    const appStyle = {
      background: '#222222',
      color: '#888888',
      textAlign: 'center',
      padding: '0px 10px',
      display: 'inline-block',
      border: '1px solid #282828',
      borderRadius: '2px'
    }

    return (
      <div style={appStyle}>
        {selectedGame ? <DetailView game={selectedGame} /> : <ListView />}
      </div>
    )
  }
}

App.propTypes = {
  selectedGame: PropTypes.object
}

function mapStateToProps(state) {
  const { selectedGame } = state.details

  return {
    selectedGame
  }
}

export default connect(mapStateToProps)(App)
