import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchBoxScore, selectTeam } from '../actions/box_score'
import LineScore from '../components/LineScore'
import Batters from '../components/Batters'

class DetailView extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { dispatch, game } = this.props
    dispatch(fetchBoxScore(game))
    // select home team as default selected team
    dispatch(selectTeam(game.homeTeam))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.game !== this.props.game) {
      const { dispatch, game } = nextProps
      dispatch(fetchBoxScore(game))
    }
  }

  handleChange(nextTeam) {
    this.props.dispatch(selectTeam(nextTeam))
  }

  render() {
    const {
      game,
      selectedTeam,
      lineScore,
      batters,
      isFetching,
      isLoaded,
      lastUpdated
    } = this.props;

    const isLoading = isFetching || !isLoaded;

    return (
      <div>
        {isLoading ? <h2>Loading...</h2> :
          <div>
            <LineScore lineScore={lineScore} />
            <Batters batters={batters} />
          </div>}
      </div>
    )
  }
}

DetailView.propTypes = {
  game: PropTypes.object.isRequired,
  selectedTeamId: PropTypes.string,
  lineScore: PropTypes.object.isRequired,
  batters: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { boxScore, selectedTeam } = state

  const {
    isFetching,
    isLoaded,
    lastUpdated
  } = boxScore

  const result = {
    selectedTeam,
    lineScore: {},
    batters: [],
    isFetching,
    isLoaded,
    lastUpdated
  }

  if (selectedTeam && isLoaded) {
    const batterData = ((teams) => {
      for (var i = 0; i < teams.length; ++i) {
        if (teams[i].team_flag === selectedTeam.flag) {
          return teams[i].batter;
        }
      }
    })(boxScore.data.batting);

    const batters = batterData.map((batter) => {
      return {
        name: batter.name_display_first_last
      }
    })

    const lineScore = {
      errors: {
        home: boxScore.data.linescore.home_team_errors,
        away: boxScore.data.linescore.away_team_errors
      },
      hits: {
        home: boxScore.data.linescore.home_team_hits,
        away: boxScore.data.linescore.away_team_hits
      },
      runs: {
        home: boxScore.data.linescore.home_team_runs,
        away: boxScore.data.linescore.away_team_runs
      },
      innings: []
    }

    boxScore.data.linescore.inning_line_score.forEach(score => {
      lineScore.innings[score.inning] = {
        home: score.home,
        away: score.away
      }
    })

    return Object.assign(result, {
      batters,
      lineScore
    })
  } else {
    return result;
  }
}

export default connect(mapStateToProps)(DetailView)
