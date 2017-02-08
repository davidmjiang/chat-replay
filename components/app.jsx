/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');
const Chatbox = require('./chatBox.jsx');
import Landing from './Landing.jsx';
import Replay from './Replay.jsx';
import Replaying from './Replaying.jsx';
import { BrowserRouter, Route } from 'react-router-dom'
import axios from 'axios';

class App extends React.Component{
	constructor (props) {
		super(props)
		this.state = {}
	}
	componentWillMount(){
		axios.get('http://localhost:3000/api/replays')
			.then((response) => {
				this.setState({replays: response.data});
		})
	}
	render () {
		if(!this.state.replays){
			return <div>Loading...</div>
		}
		else{
		return (
			<BrowserRouter>
				<div className='app'>
					<Route exact path='/' component ={Landing} />
					<Route path='/chat' component={Chatbox} />
					<Route path='/replay' component={(props) => <Replay chats={this.state.replays} {...props} />} />
					<Route path='/replays/:id' 
						component={(props) => {
												let chat = this.state.replays[props.match.params.id]
												return <Replaying chat={chat} {...props}/>
												} 
											}
					/>
				</div>
			</BrowserRouter>
			)	
		}
	}
}

export default App