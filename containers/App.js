import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ListView from '../containers/ListView'
import DetailView from '../containers/DetailView'

class App extends Component {
  render() {
    const { selectedGame } = this.props

    const appStyle = {
      background: '#ffffff',
      textAlign: 'center',
      padding: '0px 10px',
      display: 'inline-block',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
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
