import fetch from 'isomorphic-fetch'

export const SELECT_TEAM = 'SELECT_TEAM'
export const REQUEST_BOX_SCORE = 'REQUEST_BOX_SCORE'
export const RECEIVE_BOX_SCORE = 'RECEIVE_BOX_SCORE'

export function selectTeam(team) {
  return {
    type: SELECT_TEAM,
    team
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
  return dispatch => {
    dispatch(requestBoxScore(game))
    return fetch(`http://gd2.mlb.com${game.gameDataDirectory}/boxscore.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveBoxScore(game, json)));
  }
}
