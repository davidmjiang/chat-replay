/* jshint strict: false, asi: true, esversion:6 */
import { ADD_MESSAGE } from './actions.js'
const DEFAULT_STATE = {
	// initial state here
	messages: []
}

const addMessage = (state, action) => {
	const newState = {}
	let messages = state.messages.push(action.message)
	Object.assign(newState, state, {messages})
	return newState
}

const rootReducer = (state=DEFAULT_STATE, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			return addMessage(state, action)
		default: 
			return state
	}
}

export default rootReducer