import { SET_STATUS } from './actions'

const initialState = {
	status: 0
}

const rootReducer = function (state = initialState, action) {
	switch (action.type) {
		case SET_STATUS:
			return { status: action.status }
		default:
			return state
	}
}

export default rootReducer