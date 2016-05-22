import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  selectDate,
  fetchGames,
  selectPreferredTeam,
  selectGame
} from '../actions/games'
import DatePicker from '../components/DatePicker'
import Games from '../components/Games'
import Loader from '../components/Loader'
import EmptyList from '../components/EmptyList'
import ErrorDisplay from '../components/ErrorDisplay'

const preferredTeamOptions = [
  'TOR',
  'BOS',
  'BAL',
  'CWS'
]

class ListView extends Component {
  constructor(props) {
    super(props)
    this.onSelectDate = this.onSelectDate.bind(this)
    this.onSelectGame = this.onSelectGame.bind(this)
    this.onChangePreferredTeam = this.onChangePreferredTeam.bind(this)
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

  onChangePreferredTeam(e) {
    const teamAbbr = e.target.value
    if (teamAbbr !== this.props.selectPreferredTeam) {
      this.props.dispatch(selectPreferredTeam(teamAbbr))
    }
  }

  render() {
    const {
      selectedDate,
      selectedPreferredTeam,
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
        <div style={{textAlign: 'center', marginBottom: '10px'}}>
          <span style={{color: '#ffffff'}}>Favorite team:&nbsp;</span>
          <select onChange={this.onChangePreferredTeam}
                  value={selectedPreferredTeam}
                  style={{color: '#ffffff', background: 'none', outline: 'none'}}>
            {preferredTeamOptions.map(option =>
              <option key={option} value={option}>{option}</option>
            )}
          </select>
        </div>
        {networkError ? <ErrorDisplay error={networkError} /> : (isEmpty ?
          (isLoading ? <Loader /> : <EmptyList />) :
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Games games={games} onSelectGame={this.onSelectGame} />
          </div>)
        }
      </div>
    )
  }
}

ListView.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  selectedPreferredTeam: PropTypes.string.isRequired,
  games: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {
    selectedDate,
    selectedPreferredTeam,
    masterScoreboard,
    networkError
  } = state

  const {
    isFetching,
    isLoaded,
    lastUpdated,
    data
  } = masterScoreboard

  const preferredGames = []
  const otherGames = []

  // Games with the preferred team should rise to the top
  data.forEach(gameData => {
    const scores = gameData.linescore ? gameData.linescore.r : {}

    const game = {
      homeTeam: {
        id: gameData.home_team_id,
        flag: 'home',
        name: gameData.home_team_name,
        abbrev: gameData.home_name_abbrev,
        score: scores.home
      },
      awayTeam: {
        id: gameData.away_team_id,
        flag: 'away',
        name: gameData.away_team_name,
        abbrev: gameData.away_name_abbrev,
        score: scores.away
      },
      status: gameData.status.status,
      gameDataDirectory: gameData.game_data_directory
    }

    if (game.homeTeam.abbrev === selectedPreferredTeam || game.awayTeam.abbrev === selectedPreferredTeam) {
      preferredGames.push(game)
    } else {
      otherGames.push(game)
    }
  })

  const games = preferredGames.concat(otherGames)

  return {
    selectedDate,
    selectedPreferredTeam,
    games,
    isFetching,
    isLoaded,
    networkError,
    lastUpdated
  }
}

export default connect(mapStateToProps)(ListView)
