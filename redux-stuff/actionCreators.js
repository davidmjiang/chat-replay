/* jshint strict: false, asi: true, esversion:6 */
import { ADD_MESSAGE } from './actions.js'

export function addMessage(message){
	return {type: ADD_MESSAGE, message}
}