/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');
import Chatbox from './chatBox.jsx';
import Landing from './Landing.jsx';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../redux-stuff/store.js'

class App extends React.Component{
	render () {
		return (
			<BrowserRouter>
				<Provider store={store}>
					<div className='app'>
						<Route exact path='/' component ={Landing} />
						<Route path='/chat' component={Chatbox} />
					</div>
				</Provider>
			</BrowserRouter>
			)	
	}
}

export default App