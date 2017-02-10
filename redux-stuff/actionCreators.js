/* jshint strict: false, asi: true, esversion:6 */
import { ADD_MESSAGE } from './actions.js'
import { DELETE_MESSAGE } from './actions.js'

export function addMessage(message){
	return {type: ADD_MESSAGE, message}
}

export function deleteMessage(messageID){
	return {type: DELETE_MESSAGE, messageID}
}