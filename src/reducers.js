import { combineReducers } from 'redux'
import { SET_STATUS, TICK } from './actions'
import { states } from './config'

function status(state = 0, action) {
	switch (action.type) {
		case SET_STATUS:
			return action.status
		default:
			return state
	}
}

function seconds(state = states[0].duration, action) {
	switch (action.type) {
		case SET_STATUS:
			return states[action.status].duration
		case TICK:
			return state == 0 ? 0 : state - 1
		default:
			return state
	}
}

const rootReducer = combineReducers({
	status,
	seconds
})

export default rootReducer