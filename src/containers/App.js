import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
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

	componentWillUnmount() {
		this.props.dispatch(stop())
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.status != this.props.status) {
			if (nextProps.status == BREAK)
				window.ion.sound.play(BREAK_SOUND)
			else if (nextProps.status == DONE)
				window.ion.sound.play(DONE_SOUND)
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
		paused: state.paused
	}
}

export default connect(mapStateToProps)(App)
