/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');
import { Link } from 'react-router-dom';
import { url } from '../constants.jsx';

class Landing extends React.Component{
	render(){
		const styles={width: "40%", border: "2px solid black", display: "inline-block", margin: "2px", padding: "10px", textAlign: "center", backgroundColor: "#0079bf"}
		const linkStyle = {color: "white"}
		return (
			<div>
				<div style={styles}>
					<h4>Chat with friends. We'll save the transcript for you.</h4>
					<Link to="/chat" style={linkStyle}><h2>Enter the chatroom</h2></Link>
				</div>
				<div style={styles}>
					<h4>Then replay the chat whenver you want.</h4>
					<a href={`${url}/replays`} style={linkStyle}><h2>See chat replays</h2></a>
				</div>
			</div>
			)
	}
}

export default Landing