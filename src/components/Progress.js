import React, { Component } from 'react'
import ProgressBar from 'progressbar.js'

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
	}

	componentDidUpdate() {
		circle.animate(this.props.percent, { duration: 200 })
		circle.text.innerHTML = this.props.remainingTime
	}

	render() {
		return <div id="progress-container"></div>
	}
}

export default Progress