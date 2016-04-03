import { WORK, BREAK, DONE } from './config'

export const SET_STATUS = 'SET_STATUS'
export const TICK = 'TICK'

let interval

function setStatus(status) {
	return {
		type: SET_STATUS,
		status: status
	}
}

function tick() {
	return {
		type: TICK
	}
}

export function start() {
	return (dispatch, getState) => {
		interval = setInterval(() => {
			dispatch(tick())
			const state = getState()
			if (state.seconds == 0) {
				if (state.status == WORK) {
					dispatch(setStatus(BREAK))
				}
				else {
					dispatch(setStatus(DONE))
					dispatch(stop())
				}
			}
		}, 1000)
	}
}

export function stop() {
	return () => clearInterval(interval)
}
