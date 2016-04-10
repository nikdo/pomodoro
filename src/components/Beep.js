import React, { Component } from 'react'
import '../../node_modules/ion-sound/js/ion.sound.js'
import { BREAK, DONE } from '../config'

const DONE_SOUND = 'bell_ring'
const BREAK_SOUND = 'door_bell'

class Beep extends Component {

	componentDidMount() {
		ion.sound({
			sounds: [{ name: DONE_SOUND }, { name: BREAK_SOUND }],
			path: 'sounds/',
			volume: 1,
			preload: true
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.status != this.props.status) {
			if (nextProps.status == BREAK)
				ion.sound.play(BREAK_SOUND)
			else if (nextProps.status == DONE)
				ion.sound.play(DONE_SOUND)
		}
	}

	render() {
		return null
	}

}

export default Beep
