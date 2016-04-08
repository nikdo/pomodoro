import { TICK, START, STOP } from './actions'
import { states, IDLE, WORK, BREAK, DONE } from './config'

const POMODORO_DURATION = process.env.NODE_ENV == 'development' ? 10 : 25*60
const BREAK_DURATION = process.env.NODE_ENV == 'development' ? 5 : 5*60

const initialState = {
	status: IDLE,
	seconds: POMODORO_DURATION,
	duration: POMODORO_DURATION,
	paused: true,
	pomodoros: 0
}

export default (state = initialState, action) => {
	switch (action.type) {

		case TICK:
			if (state.seconds == 1) {
				if (state.status == WORK)
					return Object.assign({}, state, {
						status: BREAK,
						seconds: BREAK_DURATION,
						duration: BREAK_DURATION
					})
				if (state.status == BREAK)
					return Object.assign({}, state, {
						status: DONE,
						seconds: 0,
						paused: true,
						pomodoros: state.pomodoros + 1
					})
			}
			else
				return Object.assign({}, state, {seconds: state.seconds - 1})

		case START:
			return Object.assign({}, state,
				{paused: false},
				state.status == IDLE || state.status == DONE
					? {
						status: WORK,
						seconds: POMODORO_DURATION,
						duration: POMODORO_DURATION
					}
					: {}
			)

		case STOP:
			return Object.assign({}, state, {paused: true})

		default:
			return state
	}
}
