import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  selectDate,
  fetchGames,
  selectGame
} from '../actions/games'
import DatePicker from '../components/DatePicker'
import Games from '../components/Games'
import Loader from '../components/Loader'
import EmptyList from '../components/EmptyList'
import ErrorDisplay from '../components/ErrorDisplay'

class ListView extends Component {
  constructor(props) {
    super(props)
    this.onSelectDate = this.onSelectDate.bind(this)
    this.onSelectGame = this.onSelectGame.bind(this)
  }

  componentDidMount() {
    if (!this.props.isLoaded) {
      const { dispatch, selectedDate } = this.props
      dispatch(fetchGames(selectedDate))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate.getTime() !== this.props.selectedDate.getTime()) {
      const { dispatch, selectedDate } = nextProps
      dispatch(fetchGames(selectedDate))
    }
  }

  onSelectDate(nextDate) {
    this.props.dispatch(selectDate(nextDate))
  }

  onSelectGame(nextGame) {
    this.props.dispatch(selectGame(nextGame))
  }

  render() {
    const {
      selectedDate,
      games,
      isFetching,
      isLoaded,
      networkError,
      lastUpdated
    } = this.props
    const isEmpty = games.length === 0
    const isLoading = isFetching || !isLoaded
    return (
      <div style={{textAlign: 'left'}}>
        <DatePicker value={selectedDate} onChange={this.onSelectDate} />
        {networkError ? <ErrorDisplay error={networkError} /> : (isEmpty ?
          (isLoading ? <Loader /> : <EmptyList />) :
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Games games={games} onSelectGame={this.onSelectGame} />
          </div>
        )}
      </div>
    )
  }
}

ListView.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  games: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedDate, masterScoreboard, networkError } = state

  const {
    isFetching,
    isLoaded,
    lastUpdated,
    data
  } = masterScoreboard

  const games = data.map(game => {
    const scores = game.linescore ? game.linescore.r : {}
    return {
      homeTeam: {
        id: game.home_team_id,
        flag: 'home',
        name: game.home_team_name,
        abbrev: game.home_name_abbrev,
        score: scores.home
      },
      awayTeam: {
        id: game.away_team_id,
        flag: 'away',
        name: game.away_team_name,
        abbrev: game.away_name_abbrev,
        score: scores.away
      },
      status: game.status.status,
      gameDataDirectory: game.game_data_directory
    }
  })

  return {
    selectedDate,
    games,
    isFetching,
    isLoaded,
    networkError,
    lastUpdated
  }
}

export default connect(mapStateToProps)(ListView)
