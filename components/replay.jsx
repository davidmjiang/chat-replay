/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');
import axios from 'axios';

class Replay extends React.Component{
	constructor(){
		super()
		this.state = {replays: {}};
	}
	componentDidMount(){
		axios.get('http://localhost:3000/api/replays')
			.then((response) => {
				console.log('response', response);
				this.setState({replays: response.data});
			})
	}
	render () {
		return (
				<ul>
					{Object.keys(this.state.replays).map((key, index) => <li key={index}>{this.state.replays[key].startTime}</li>)}
				</ul>
			)
	}
}

export default Replay