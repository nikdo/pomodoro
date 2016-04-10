import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { start, stop, skip } from '../actions'
import { states, BREAK } from '../config'
import Status from '../components/Status'
import Beep from '../components/Beep'
import Progress from '../components/Progress'
import Controls from '../components/Controls'
import Pomodoros from '../components/Pomodoros'

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

	render() {
		const {status, remainingTime, progress, paused, pomodoros, dispatch} = this.props
		return (
			<DocumentTitle title={getTitle(states[status].name, remainingTime)}>
				<div>
					<Status status={states[status]} />
					<Beep status={status} />
					<Progress percent={progress} remainingTime={remainingTime} />
					<Controls
						paused={paused}
						start={() => dispatch(start())}
						stop={() => dispatch(stop())}
						skip={() => dispatch(skip())}
						showSkip={status == BREAK} />
					<Pomodoros count={pomodoros} />
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
