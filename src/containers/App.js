import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setStatus } from '../actions'
import Counter from '../components/Counter'

const states = [
	{ name: 'Work', duration: 10 },
	{ name: 'Break', duration: 5 },
	{ name: 'Done', duration: 0}
]

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			secondsRemaining: states[0].duration
		}
		this.tick = this.tick.bind(this)
	}

	tick() {
		const status = this.props.status
		if (this.state.secondsRemaining == 0 && status < 2)
			this.props.dispatch(this.props.dispatch(setStatus(status + 1)))

		this.setState(
			{
				secondsRemaining: this.state.secondsRemaining == 0 ? 0 : this.state.secondsRemaining - 1
			}
		)
	}

	componentDidMount() {
		this.interval = setInterval(this.tick, 1000)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			secondsRemaining: this.props.status != nextProps.status ? states[nextProps.status].duration : this.state.secondsRemaining
		})
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<div>
				<h2>{states[this.props.status].name}</h2>
				<Counter sec={this.state.secondsRemaining} />
			</div>
		)
	}
}

export default connect(state => { return ({ status: state.status }) })(App)
