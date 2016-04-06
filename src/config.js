export const states = [
	{ icon: 'glyphicon-off' },
	{ name: 'Work', duration: NODE_ENV == 'development' ? 10 : 25*60, icon: 'glyphicon-fire' },
	{ name: 'Break', duration: NODE_ENV == 'development' ? 5 : 5*60, icon: 'glyphicon-flash' },
	{ name: 'Done', icon: 'glyphicon-check' }
]

export const IDLE = 0
export const WORK = 1
export const BREAK = 2
export const DONE = 3