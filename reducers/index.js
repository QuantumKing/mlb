import { combineReducers } from 'redux'
import { masterScoreboard, selectedDate, selectedGame } from './games'
import { boxScore, selectedTeamId } from './box_score';

const rootReducer = combineReducers({
  masterScoreboard,
  selectedDate,
  selectedGame,
  boxScore,
  selectedTeamId
})

export default rootReducer
