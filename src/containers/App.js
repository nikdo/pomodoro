import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sayHello } from '../actions'
import Counter from '../components/Counter'

const statuses = ['Work', 'Break', 'Done']
const durations = [10, 5, 0]

const getStatus = function(status, secondsRemaining) {
	return status == 2 ? status : (secondsRemaining > 0 ? status : (status + 1) % 3)
}

const getSecondsRemaining = function(status, secondsRemaining) {
	return status == 2 ? 0 : (secondsRemaining > 0 ? secondsRemaining - 1 : durations[(status + 1) % 3])
}

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			secondsRemaining: durations[0],
			status: 0
		}
		this.tick = this.tick.bind(this)
	}

	tick() {
		this.setState(
			{
				secondsRemaining: getSecondsRemaining(this.state.status, this.state.secondsRemaining),
				status: getStatus(this.state.status, this.state.secondsRemaining)
			}
		)
	}

	componentDidMount() {
		this.interval = setInterval(this.tick, 1000)
		this.props.dispatch(sayHello())
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<div>
				{this.props.hello}
				<p>{statuses[this.state.status]}</p>
				<Counter sec={this.state.secondsRemaining} />
			</div>
		)
	}
}

export default connect(state => { return ({ hello: state.hello }) })(App)