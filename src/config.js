export const states = [
	{ icon: 'glyphicon-off' },
	{ icon: 'glyphicon-fire', name: 'Work' },
	{ icon: 'glyphicon-flash', name: 'Break' },
	{ icon: 'glyphicon-check', name: 'Done' }
]

export const IDLE = 0
export const WORK = 1
export const BREAK = 2
export const DONE = 3

export const DONE_SOUND = 'bell_ring'
export const BREAK_SOUND = 'door_bell'

window.ion.sound({
	sounds: [{ name: DONE_SOUND }, { name: BREAK_SOUND }],
	path: 'sounds/',
	volume: 1,
	preload: true
})
