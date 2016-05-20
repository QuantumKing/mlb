import { combineReducers } from 'redux'
import { masterScoreboard, selectedDate, selectedGame } from './games'
import { boxScore, selectedTeam } from './details';

const rootReducer = combineReducers({
  masterScoreboard,
  selectedDate,
  details: combineReducers({
    selectedGame,
    boxScore,
    selectedTeam
  })
})

export default rootReducer
