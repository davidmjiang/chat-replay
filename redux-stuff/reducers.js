/* jshint strict: false, asi: true, esversion:6 */
import { ADD_MESSAGE } from './actions.js'
import { DELETE_MESSAGE } from './actions.js'
var findIndex = require('lodash/findIndex.js')

const DEFAULT_STATE = {
	// initial state here
	messages: []
}

const addMessage = (state, action) => {
	const newState = {}
	Object.assign(newState, state, { messages: [...state.messages, action.message]})
	return newState
}

const deleteMessage = (state, action) => {
	const newState = {}
	let messages = [...state.messages]
	// delete the message with messageID === action.messageID if it exists
	let idx = findIndex(messages, (msg) => { return msg.messageID === action.messageID })
	if(idx !== -1){
		messages.splice(idx,1)	
	}
	Object.assign(newState, state, {messages})
	return newState
}

const rootReducer = (state=DEFAULT_STATE, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			return addMessage(state, action)
		case DELETE_MESSAGE:
			return deleteMessage(state, action)
		default: 
			return state
	}
}

export default rootReducer