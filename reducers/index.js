import { combineReducers } from 'redux'
import {
  masterScoreboard,
  selectedDate,
  selectedGame,
  selectedPreferredTeam
} from './games'
import { boxScore, selectedTeam } from './details';
import { networkError } from './error'

const rootReducer = combineReducers({
  masterScoreboard,
  selectedDate,
  selectedPreferredTeam,
  networkError,
  details: combineReducers({
    selectedGame,
    boxScore,
    selectedTeam
  })
})

export default rootReducer
