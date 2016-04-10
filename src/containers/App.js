import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import '../../node_modules/ion-sound/js/ion.sound.js'
import { start, stop, skip } from '../actions'
import { states, IDLE, WORK, BREAK, DONE, BREAK_SOUND, DONE_SOUND } from '../config'
import Status from '../components/Status'
import Progress from '../components/Progress'
import Controls from '../components/Controls'

function getTitle(statusName, remainingTime) {
	return statusName ? `${statusName}: ${remainingTime}` : 'Pomodoro'
}

function formatRemainingTime(seconds) {
	return Math.floor(seconds/60) + ':' + ('0' + seconds%60).slice(-2)
}

class App extends Component {

	componentDidMount() {
		ion.sound({
			sounds: [{ name: DONE_SOUND }, { name: BREAK_SOUND }],
			path: 'sounds/',
			volume: 1,
			preload: true
		})
	}

	componentWillUnmount() {
		this.props.dispatch(stop())
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
		const status = states[this.props.status]
		return (
			<DocumentTitle title={getTitle(status.name, this.props.remainingTime)}>
				<div>
					<Status status={status} />
					<Progress
						percent={this.props.progress}
						remainingTime={this.props.remainingTime} />
					<Controls
						paused={this.props.paused}
						start={() => this.props.dispatch(start())}
						stop={() => this.props.dispatch(stop())}
						skip={() => this.props.dispatch(skip())}
						showSkip={this.props.status == BREAK} />
					<div className="pomodoros">
						{Array.apply(0, Array(this.props.pomodoros)).map((x, i) =>
							<span className="pomodoro" key={i}></span>)
						}
					</div>
				</div>
			</DocumentTitle>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		status: state.status,
		progress: state.seconds / state.duration,
		remainingTime: formatRemainingTime(state.seconds),
		paused: state.paused,
		pomodoros: state.pomodoros
	}
}

export default connect(mapStateToProps)(App)
