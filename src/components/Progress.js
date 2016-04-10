import React, { Component } from 'react'
import ProgressBar from 'progressbar.js'
import Piecon from 'piecon'

let circle

class Progress extends Component {

	componentDidMount() {
		circle = new ProgressBar.Circle('#progress-container', {
			color: '#000',
			trailColor: '#ededed',
			strokeWidth: 5,
			trailWidth: 5,
			text: {
				value: this.props.remainingTime,
				className: 'progress-label',
				style: null
			}
		})
		circle.set(1)

		Piecon.setOptions({
			color: '#000',
			background: '#ededed',
			shadow: '#000',
			fallback: false
		})
		Piecon.setProgress(100);
	}

	componentDidUpdate() {
		circle.animate(this.props.percent, { duration: 200 })
		circle.text.innerHTML = this.props.remainingTime
		Piecon.setProgress(this.props.percent*100);
	}

	render() {
		return <div id="progress-container"></div>
	}
}

export default Progress
