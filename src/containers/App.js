import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sayHello } from '../actions'
import Counter from '../components/Counter'

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			secondsRemaining: 25*60
		}
		this.tick = this.tick.bind(this)
	}

	tick() {
		this.setState(
			{ secondsRemaining: this.state.secondsRemaining - 1 }
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
				<Counter sec={this.state.secondsRemaining} />
			</div>
		)
	}
}

export default connect(state => { return ({ hello: state.hello }) })(App)