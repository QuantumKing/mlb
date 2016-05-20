import fetch from 'isomorphic-fetch'

export const REQUEST_GAMES = 'REQUEST_GAMES'
export const RECEIVE_GAMES = 'RECEIVE_GAMES'
export const SELECT_DATE = 'SELECT_DATE'
export const INVALIDATE_DATE = 'INVALIDATE_DATE'
export const SELECT_GAME = 'SELECT_GAME'

export function selectGame(game) {
  return {
    type: SELECT_GAME,
    game
  }
}

export function selectDate(date) {
  return {
    type: SELECT_DATE,
    date
  }
}

export function invalidateDate(date) {
  return {
    type: INVALIDATE_DATE,
    date
  }
}

function requestGames(date) {
  return {
    type: REQUEST_GAMES,
    date
  }
}

function receiveGames(date, json) {
  return {
    type: RECEIVE_GAMES,
    date,
    games: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchGames(date) {
  return dispatch => {
    dispatch(requestGames(date))
    return fetch(`https://www.reddit.com/r/${date}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveGames(date, json)))
  }
}

function shouldFetchGames(state, date) {
  const games = state.gamesByDate[reddit]
  if (!games) {
    return true
  }
  if (games.isFetching) {
    return false
  }
  return games.didInvalidate
}

export function fetchGamesIfNeeded(date) {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState(), date)) {
      return dispatch(fetchGames(date))
    }
  }
}
