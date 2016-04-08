import { TICK, START, STOP } from './actions'
import { states, IDLE, WORK, BREAK, DONE } from './config'

const POMODORO_DURATION = process.env.NODE_ENV == 'development' ? 5 : 25*60
const BREAK_DURATION = process.env.NODE_ENV == 'development' ? 3 : 5*60
const LONG_BREAK_DURATION = process.env.NODE_ENV == 'development' ? 15 : 25*60

const initialState = {
	status: IDLE,
	seconds: POMODORO_DURATION,
	duration: POMODORO_DURATION,
	paused: true,
	pomodoros: 0
}

function getBreakLength(completedPomodoros) {
	return completedPomodoros % 4 ? BREAK_DURATION : LONG_BREAK_DURATION
}

export default (state = initialState, action) => {
	switch (action.type) {

		case TICK:
			if (state.seconds == 1) {
				if (state.status == WORK) {
					const completedPomodoros = state.pomodoros + 1
					return Object.assign({}, state, {
						status: BREAK,
						seconds: getBreakLength(completedPomodoros),
						duration: getBreakLength(completedPomodoros),
						pomodoros: completedPomodoros
					})
				}
				if (state.status == BREAK)
					return Object.assign({}, state, {
						status: DONE,
						seconds: 0,
						paused: true
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
