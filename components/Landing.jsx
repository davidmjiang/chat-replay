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
					<li><Link to="/replay">See chat replays</Link></li>
				</ul>
			</div>
			)
	}
}

export default Landing;