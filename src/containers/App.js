import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sayHello } from '../actions'

class App extends Component {

	componentDidMount() {
		this.props.dispatch(sayHello())
	}

	render() {
		return (
			<div>{this.props.hello}</div>
		)
	}
}

export default connect(state => { return ({ hello: state.hello }) })(App)