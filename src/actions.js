export const SET_STATUS = 'SET_STATUS'
export const TICK = 'TICK'

export function setStatus(status) {
	return {
		type: SET_STATUS,
		status: status
	}
}

export function tick() {
	return {
		type: TICK
	}
}