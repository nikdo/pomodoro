import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { start, stop, skip } from '../actions'
import { states, BREAK } from '../config'
import Status from '../components/Status'
import Beep from '../components/Beep'
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

	render() {
		const {status} = this.props
		return (
			<DocumentTitle title={getTitle(states[status].name, this.props.remainingTime)}>
				<div>
					<Status status={states[status]} />
					<Beep status={status} />
					<Progress
						percent={this.props.progress}
						remainingTime={this.props.remainingTime} />
					<Controls
						paused={this.props.paused}
						start={() => this.props.dispatch(start())}
						stop={() => this.props.dispatch(stop())}
						skip={() => this.props.dispatch(skip())}
						showSkip={status == BREAK} />
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
