import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  selectDate,
  fetchGamesIfNeeded,
  invalidateDate,
  selectGame
} from '../actions/games'
import DatePicker from '../components/DatePicker'
import Games from '../components/Games'

class ListView extends Component {
  constructor(props) {
    super(props)
    this.onSelectDate = this.onSelectDate.bind(this)
    this.onSelectGame = this.onSelectGame.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedDate } = this.props
    dispatch(fetchGamesIfNeeded(selectedDate))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate !== this.props.selectedDate) {
      const { dispatch, selectedDate } = nextProps
      dispatch(fetchGamesIfNeeded(selectedDate))
    }
  }

  onSelectDate(nextDate) {
    this.props.dispatch(selectDate(nextDate))
  }

  onSelectGame(nextGame) {
    this.props.dispatch(selectGame(nextGame))
  }

  render() {
    const { selectedDate, games, isFetching, lastUpdated } = this.props
    const isEmpty = games.length === 0
    return (
      <div>
        <DatePicker value={selectedDate} onChange={this.onSelectDate} />
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>No games today.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Games games={games} onSelectGame={this.onSelectGame} />
            </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  selectedDate: PropTypes.date.isRequired,
  games: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedDate, gamesByDate } = state
  const {
    isFetching,
    lastUpdated,
    items: games
  } = gamesByDate[selectedDate] || {
    isFetching: true,
    items: []
  }

  return {
    selectedDate,
    games,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(ListView)
