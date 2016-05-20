import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchBoxScore, selectTeam } from '../actions/boxscore'
import InningLineScore from '../components/InningLineScore'
import Batting from '../components/Batting'

class DetailView extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { dispatch, game } = this.props
    // select default team here from `game`
    dispatch(fetchBoxscore(game))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.game !== this.props.game) {
      const { dispatch, game } = nextProps
      dispatch(fetchBoxScore(game))
    }
  }

  handleChange(nextTeamId) {
    this.props.dispatch(selectTeam(nextTeamId))
  }

  render() {
    const {
      game,
      selectedTeamId,
      inningLineScore,
      batting,
      isFetching,
      lastUpdated
    } = this.props;

    return (
      <div>
        {isFetching ? 'Loading...' :
          <InningLineScore inningLineScore={inningLineScore} />
          <Batting batting={batting} />}
      </div>
    )
  }
}

App.propTypes = {
  game: PropTypes.object.isRequired,
  selectedTeamId: PropTypes.number,
  inningLineScore: PropTypes.array.isRequired,
  batting: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {
    game,
    boxScore,
    selectedTeamId,
    isFetching,
    lastUpdated
  } = state

  const teamBoxScore = boxScore[selectedTeamId]
  const inningLineScore = teamBoxScore.inning_line_score
  const batting = teamBoxScore.batting

  return {
    game,
    selectedTeamId,
    inningLineScore,
    batting,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(DetailView)
