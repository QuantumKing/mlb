import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchBoxScore, selectTeam, navigateBack } from '../actions/details'
import LineScore from '../components/LineScore'
import Batters from '../components/Batters'
import TeamTabBar from '../components/TeamTabBar'

class DetailView extends Component {
  constructor(props) {
    super(props)
    this.handleTeamChange = this.handleTeamChange.bind(this)
    this.handleNavigateBack = this.handleNavigateBack.bind(this)
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

  handleTeamChange(nextTeam) {
    if (nextTeam !== this.props.selectedTeam) {
      this.props.dispatch(selectTeam(nextTeam))
    }
  }

  handleNavigateBack() {
    this.props.dispatch(navigateBack())
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

    const isLoading = isFetching || !isLoaded

    const backStyle = {cursor: 'pointer', marginBottom: '5px'}

    return (
      <div>
        <div onClick={this.handleNavigateBack} style={backStyle}>&lt;&nbsp;Back</div>
        {isLoading ? <h2>Loading...</h2> :
          <div>
            <LineScore game={game} lineScore={lineScore} />
            <TeamTabBar
              defaultTeam={selectedTeam}
              teams={[game.homeTeam, game.awayTeam]}
              onChange={this.handleTeamChange}/>
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
  const { boxScore, selectedTeam } = state.details

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
        name: batter.name, //name_display_first_last
        ab: batter.ab,
        r: batter.r,
        h: batter.h,
        rbi: batter.rbi,
        bb: batter.bb,
        so: batter.so,
        avg: batter.avg
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
