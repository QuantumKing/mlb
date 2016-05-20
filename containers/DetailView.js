import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchBoxScore, selectTeam } from '../actions/box_score'
import InningLineScore from '../components/InningLineScore'
import Batters from '../components/Batters'

class DetailView extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { dispatch, game } = this.props
    // select home team as default selected team
    dispatch(selectTeam(game.homeTeam))
    dispatch(fetchBoxScore(game))
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
      selectedTeamId,
      inningLineScore,
      batters,
      isFetching,
      lastUpdated
    } = this.props;

    return (
      <div>
        {isFetching ? <h2>Loading...</h2> :
          <div>
            <InningLineScore inningLineScore={inningLineScore} />
            <Batters batters={batters} />
          </div>}
      </div>
    )
  }
}

DetailView.propTypes = {
  game: PropTypes.object.isRequired,
  selectedTeamId: PropTypes.string,
  inningLineScore: PropTypes.array.isRequired,
  batters: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { boxScore, selectedTeam } = state

  const {
    isFetching,
    lastUpdated
  } = boxScore || {
    isFetching: true
  }

  const result = {
    selectedTeam,
    inningLineScore: [],
    batters: [],
    isFetching,
    lastUpdated
  }

  if (selectedTeam && !isFetching) {
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

    console.log(batters);

    return Object.assign(result, {
      batters,
      inningLineScore: boxScore.data.linescore.inning_line_score
    })
  } else {
    return result;
  }
}

export default connect(mapStateToProps)(DetailView)
