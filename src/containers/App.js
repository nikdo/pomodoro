import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { start, stop } from '../actions'
import { states } from '../config'
import Counter from '../components/Counter'

class App extends Component {

	componentDidMount() {
		this.props.dispatch(start())
	}

	componentWillUnmount() {
		this.props.dispatch(stop())
	}

	render() {
		return (
			<DocumentTitle title={this.props.status + ': ' + this.props.remainingTime}>
				<Counter status={this.props.status} remainingTime={this.props.remainingTime} />
			</DocumentTitle>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		status: states[state.status].name,
		remainingTime: Math.floor(state.seconds/60) + ':' + ('0' + state.seconds%60).slice(-2)
	}
}

export default connect(mapStateToProps)(App)
