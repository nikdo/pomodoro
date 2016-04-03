import { SET_STATUS, TICK } from './actions'
import { states } from './config'

const initialState = {
	status: 0,
	secondsRemaining: 10
}

const rootReducer = function (state = initialState, action) {
	switch (action.type) {
		case SET_STATUS:
			return { status: action.status, secondsRemaining: states[action.status].duration }
		case TICK:
			return { status: state.status, secondsRemaining: state.secondsRemaining == 0 ? 0 : state.secondsRemaining - 1 }
		default:
			return state
	}
}

export default rootReducer