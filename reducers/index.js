import { combineReducers } from 'redux'
import { gamesByDate, selectedDate, selectedGame } from './games'
import { boxScore, selectedTeamId } from './box_score';

const rootReducer = combineReducers({
  gamesByDate,
  selectedDate,
  selectedGame,
  boxScore,
  selectedTeamId
})

export default rootReducer
