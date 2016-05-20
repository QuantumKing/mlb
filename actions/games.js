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
    masterScoreboard: json.data.games.game,
    receivedAt: Date.now()
  }
}

export function fetchGames(date) {
  return dispatch => {
    dispatch(requestGames(date))
    const day = `0${date.getDate()}`.slice(-2)
    const month = `0${date.getMonth()}`.slice(-2)
    const year = date.getFullYear()
    return fetch(`http://gd2.mlb.com/components/game/mlb/year_${year}/month_${month}/day_${day}/master_scoreboard.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveGames(date, json)))
  }
}
