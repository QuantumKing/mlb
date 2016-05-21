import { RECEIVE_GAMES } from '../actions/games'
import { RECEIVE_BOX_SCORE, NAVIGATE_BACK } from '../actions/details'
import { CATCH_ERROR } from '../actions/error'

export function networkError(state = null, action) {
  switch (action.type) {
    case RECEIVE_GAMES:
    case RECEIVE_BOX_SCORE:
    case NAVIGATE_BACK:
      return null
    case CATCH_ERROR:
      return action.error
    default:
      return state
  }
}
