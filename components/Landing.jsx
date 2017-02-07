/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');

class Landing extends React.Component{
	render(){
		return (
			<div>
				<h1>Welcome to Chat</h1>
				<button>Enter the chatroom</button>
				<button>See chat replays</button>
			</div>
			)
	}
}

module.exports = Landing;