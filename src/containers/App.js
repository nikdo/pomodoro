import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { start, stop } from '../actions'
import { states, BREAK, DONE, BREAK_SOUND, DONE_SOUND } from '../config'
import Counter from '../components/Counter'
import Controls from '../components/Controls'

function getTitle(statusName, remainingTime) {
	return statusName ? `${statusName}: ${remainingTime}` : 'Pomodoro'
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
					<Counter status={status} remainingTime={this.props.remainingTime} />
					<Controls
						paused={this.props.paused}
						start={() => this.props.dispatch(start())}
						stop={() => this.props.dispatch(stop())}/>
				</div>
			</DocumentTitle>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		status: state.status,
		remainingTime: Math.floor(state.seconds/60) + ':' + ('0' + state.seconds%60).slice(-2),
		paused: state.paused
	}
}

export default connect(mapStateToProps)(App)
