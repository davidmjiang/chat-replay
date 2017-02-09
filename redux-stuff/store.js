/* jshint strict: false, asi: true, esversion:6 */
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

export default store