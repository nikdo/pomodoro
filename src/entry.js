import styles from './styles/main.styl'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import App from './containers/App'

const logger = createLogger({
	collapsed: true,
	predicate: () => process.env.NODE_ENV === 'development'
})
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
const store = createStoreWithMiddleware(rootReducer)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('entry')
)