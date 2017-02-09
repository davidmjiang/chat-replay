/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');
import { Link } from 'react-router-dom';

class Landing extends React.Component{
	render(){
		return (
			<div>
				<h1>Welcome to Chat</h1>
				<ul>
					<li><Link to="/chat">Enter the chatroom</Link></li>
					<li><a href="https://floating-basin-79702.herokuapp.com/replays">See chat replays</a></li>
				</ul>
			</div>
			)
	}
}

export default Landing;