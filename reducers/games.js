import {
  SELECT_DATE,
  REQUEST_GAMES, RECEIVE_GAMES,
  SELECT_GAME
} from '../actions/games'

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
  data: []
}, action) {
  switch (action.type) {
    case REQUEST_GAMES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_GAMES:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.masterScoreboard,
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
    default:
      return state
  }
}
