import { combineReducers } from 'redux'
import { SET_STATUS, TICK, GO, PAUSE } from './actions'
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

function paused(state = true, action) {
	switch (action.type) {
		case GO:
			return false
		case PAUSE:
			return true
		default:
			return state
	}
}

const rootReducer = combineReducers({
	status,
	seconds,
	paused
})

export default rootReducer