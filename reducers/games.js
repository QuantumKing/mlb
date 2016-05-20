import {
  SELECT_DATE, INVALIDATE_DATE,
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

function games(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_DATE:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_GAMES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_GAMES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.games,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export function gamesByDate(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_DATE:
    case RECEIVE_GAMES:
    case REQUEST_GAMES:
      return Object.assign({}, state, {
        [action.date]: games(state[action.date], action)
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
