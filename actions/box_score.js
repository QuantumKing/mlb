import fetch from 'isomorphic-fetch'

export const SELECT_TEAM = 'SELECT_TEAM'
export const REQUEST_BOX_SCORE = 'REQUEST_BOX_SCORE'
export const RECEIVE_BOX_SCORE = 'RECEIVE_BOX_SCORE'

export function selectTeam(teamId) {
  return {
    type: SELECT_TEAM,
    teamId
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
    boxScore: json.boxscore,
    receivedAt: Date.now()
  }
}

export function fetchBoxScore(game) {
  return dispatch => {
    dispatch(requestBoxScore(game))
    return fetch(`${game.game_data_directory}/boxscore.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveBoxScore(game, json)));
  }
}
