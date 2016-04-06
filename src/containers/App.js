import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { start, stop } from '../actions'
import { states } from '../config'
import Counter from '../components/Counter'
import Controls from '../components/Controls'

function getTitle(statusName, remainingTime) {
	return statusName ? `${statusName}: ${remainingTime}` : 'Pomodoro'
}

class App extends Component {

	componentWillUnmount() {
		this.props.dispatch(stop())
	}

	render() {
		return (
			<DocumentTitle title={getTitle(this.props.status.name, this.props.remainingTime)}>
				<div>
					<Counter status={this.props.status} remainingTime={this.props.remainingTime} />
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
		status: states[state.status],
		remainingTime: Math.floor(state.seconds/60) + ':' + ('0' + state.seconds%60).slice(-2),
		paused: state.paused
	}
}

export default connect(mapStateToProps)(App)
