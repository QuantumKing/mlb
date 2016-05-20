import {
  REQUEST_BOX_SCORE, RECEIVE_BOX_SCORE,
  SELECT_TEAM
} from '../actions/box_score'

export function selectedTeam(state = null, action) {
  switch (action.type) {
    case SELECT_TEAM:
      return action.team
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
