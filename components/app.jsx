/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');
const Chatbox = require('./chatBox.jsx');
const Landing = require('./Landing.jsx');
const Replay = require('./Replay.jsx');
import { BrowserRouter, Route } from 'react-router-dom'

class App extends React.Component{
	constructor (props) {
		super(props)
	}
	render () {
		return (
			<BrowserRouter>
				<div className='app'>
					<Route exact path='/' component ={Landing} />
					<Route path='/chat' component={Chatbox} />
					<Route path='/replay' component={Replay} />
				</div>
			</BrowserRouter>
			)
	}
}

export default App