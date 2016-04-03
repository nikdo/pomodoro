import React, { Component } from 'react'
import { connect } from 'react-redux'
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
			<div>
				<h2>{states[this.props.status].name}</h2>
				<Counter sec={this.props.seconds} />
			</div>
		)
	}
}

export default connect(state => state)(App)
