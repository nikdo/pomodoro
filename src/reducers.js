import { SAY_HELLO } from './actions'

const rootReducer = function (state = {}, action) {
	switch (action.type) {
		case SAY_HELLO:
			return { hello: "Hello World!" }
		default:
			return state
	}
}

export default rootReducer