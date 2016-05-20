import {
  REQUEST_BOX_SCORE, RECEIVE_BOX_SCORE,
  SELECT_TEAM
} from '../actions/boxscore'

export function selectedTeamId(state = null, action) {
  switch (action.type) {
    case SELECT_TEAM:
      return action.teamId
    default:
      return state
  }
}

export function boxScore(state = {
  isFetching: false,
  data: {}
}, action) {
  switch (action.type) {
    case REQUEST_BOX_SCORE:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_BOX_SCORE:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.boxScore,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
