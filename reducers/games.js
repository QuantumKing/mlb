import {
  SELECT_DATE,
  REQUEST_GAMES, RECEIVE_GAMES,
  SELECT_GAME
} from '../actions/games'
import { NAVIGATE_BACK } from '../actions/details'

function yesterday() {
  var tmp = new Date();
  return new Date(
    tmp.setDate(tmp.getDate() - 1)
  );
}

export function selectedDate(state = yesterday(), action) {
  switch (action.type) {
    case SELECT_DATE:
      return action.date
    default:
      return state
  }
}

export function masterScoreboard(state = {
  isFetching: false,
  isLoaded: false,
  data: []
}, action) {
  switch (action.type) {
    case REQUEST_GAMES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_GAMES:
      var games = action.games || []
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        data: action.games,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export function selectedGame(state = null, action) {
  switch (action.type) {
    case SELECT_GAME:
      return action.game
    case NAVIGATE_BACK:
      return null
    default:
      return state
  }
}
