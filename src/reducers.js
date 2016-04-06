import { TICK, START, STOP } from './actions'
import { states, IDLE, WORK, BREAK, DONE } from './config'

const initialState = { status: IDLE, seconds: states[WORK].duration, paused: true }

export default (state = initialState, action) => {
	switch (action.type) {

		case TICK:
			if (state.seconds == 1) {
				if (state.status == WORK)
					return { status: BREAK, seconds: states[BREAK].duration, paused: false }
				if (state.status == BREAK)
					return { status: DONE, seconds: 0, paused: true }
			}
			else
				return { status: state.status, seconds: state.seconds - 1, paused: false }

		case START:
			return {
				status: state.status == IDLE || state.status == DONE
					? WORK
					: state.status,
				seconds: state.status == IDLE || state.status == DONE
					? states[WORK].duration
					: state.seconds,
				paused: false
			}

		case STOP:
			return {
				status: state.status,
				seconds: state.seconds,
				paused: true
			}

		default:
			return state
	}
}
