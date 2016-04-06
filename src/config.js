export const states = [
	{ icon: 'glyphicon-off' },
	{ name: 'Work', duration: process.env.NODE_ENV == 'development' ? 10 : 25*60, icon: 'glyphicon-fire' },
	{ name: 'Break', duration: process.env.NODE_ENV == 'development' ? 5 : 5*60, icon: 'glyphicon-flash' },
	{ name: 'Done', icon: 'glyphicon-check' }
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
	volume: 0.6,
	preload: true
})
