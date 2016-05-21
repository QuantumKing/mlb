import fetch from 'isomorphic-fetch'
import { catchError } from './error'

export const SELECT_TEAM = 'SELECT_TEAM'
export const REQUEST_BOX_SCORE = 'REQUEST_BOX_SCORE'
export const RECEIVE_BOX_SCORE = 'RECEIVE_BOX_SCORE'
export const NAVIGATE_BACK = 'NAVIGATE_BACK'

export function selectTeam(team) {
  return {
    type: SELECT_TEAM,
    team
  }
}

export function navigateBack() {
  return {
    type: NAVIGATE_BACK,
    updatedAt: Date.now()
  }
}

function requestBoxScore(game) {
  return {
    type: REQUEST_BOX_SCORE,
    game
  }
}

function receiveBoxScore(game, json) {
  return {
    type: RECEIVE_BOX_SCORE,
    game,
    boxScore: json.data.boxscore,
    receivedAt: Date.now()
  }
}

export function fetchBoxScore(game) {
  return (dispatch, getState) => {
    dispatch(requestBoxScore(game))
    return fetch(`http://gd2.mlb.com${game.gameDataDirectory}/boxscore.json`)
      .then(response => response.json())
      .then(json => {
        if (getState().details.boxScore.isFetching) {
          // In case user navigates back before request finishes
          dispatch(receiveBoxScore(game, json))
        }
      }, error => {
        if (getState().details.boxScore.isFetching) {
          dispatch(catchError(error))
        }
      });
  }
}
