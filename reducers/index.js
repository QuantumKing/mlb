import { combineReducers } from 'redux'
import { masterScoreboard, selectedDate, selectedGame } from './games'
import { boxScore, selectedTeam } from './box_score';

const rootReducer = combineReducers({
  masterScoreboard,
  selectedDate,
  selectedGame,
  boxScore,
  selectedTeam
})

export default rootReducer
