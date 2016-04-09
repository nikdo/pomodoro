export const TICK = 'TICK'
export const START = 'START'
export const STOP = 'STOP'
export const SKIP = 'SKIP'

let interval

function tick() {
	return (dispatch, getState) => {
		if (getState().paused)
			clearInterval(interval)
		else
			dispatch({ type: TICK })
	}
}

export function start() {
	return (dispatch, getState) => {
		dispatch({ type: START })
		dispatch(tick()) // tick imediately after activation
		interval = setInterval(() => {
			dispatch(tick())
		}, 1000)
	}
}

export function stop() {
	return { type: STOP }
}

export function skip() {
	return { type: SKIP }
}
