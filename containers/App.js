import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectGame } from '../actions'
import ListView from '../containers/ListView'
import DetailView from '../containers/DetailView'

class App extends Component {
  render() {
    const { selectedGame } = this.props
    return (
      <div>
        {selectedGame ? <DetailView game={selectedGame} /> : <ListView />}
      </div>
    )
  }
}

App.propTypes = {
  selectedGame: PropTypes.object
}

function mapStateToProps(state) {
  const { selectedGame } = state

  return {
    selectedGame
  }
}

export default connect(mapStateToProps)(App)
