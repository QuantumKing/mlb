import fetch from 'isomorphic-fetch'
import { catchError } from './error'
import { makeArray } from '../utils'

export const REQUEST_GAMES = 'REQUEST_GAMES'
export const RECEIVE_GAMES = 'RECEIVE_GAMES'
export const SELECT_DATE = 'SELECT_DATE'
export const SELECT_GAME = 'SELECT_GAME'
export const SELECT_PREFERRED_TEAM = 'SELECT_PREFERRED_TEAM'

export function selectGame(game) {
  return {
    type: SELECT_GAME,
    game
  }
}

export function selectPreferredTeam(teamAbbr) {
  return {
    type: SELECT_PREFERRED_TEAM,
    teamAbbr
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
    games: makeArray(json.data.games.game),
    receivedAt: Date.now()
  }
}

export function fetchGames(date) {
  return dispatch => {
    dispatch(requestGames(date))
    const day = `0${date.getDate()}`.slice(-2)
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const year = date.getFullYear()
    return fetch(`http://gd2.mlb.com/components/game/mlb/year_${year}/month_${month}/day_${day}/master_scoreboard.json`)
      .then(response => response.json())
      .then(
        json => dispatch(receiveGames(date, json)),
        error => dispatch(catchError(error))
      )
  }
}
