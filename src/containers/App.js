import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setStatus, tick } from '../actions'
import { states } from '../config'
import Counter from '../components/Counter'

class App extends Component {

	constructor(props) {
		super(props)
		this.tick = this.tick.bind(this)
	}

	tick() {
		this.props.dispatch(tick())
		const status = this.props.status
		if (this.props.secondsRemaining == 0 && status < 2)
			this.props.dispatch(this.props.dispatch(setStatus(status + 1)))
	}

	componentDidMount() {
		this.interval = setInterval(this.tick, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<div>
				<h2>{states[this.props.status].name}</h2>
				<Counter sec={this.props.secondsRemaining} />
			</div>
		)
	}
}

export default connect(state => state)(App)
