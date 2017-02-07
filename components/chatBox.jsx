/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');
const Message = require('./chatMessage.jsx');
var io = require('socket.io-client');
var $ = require("jquery");

class Chatbox extends React.Component {
	constructor (props) {
		super(props)
		this.state = {messages: []}
	}
	componentWillMount(){
		this.socket = io('http://localhost:3000');
		let userName = prompt("Welcome to my chat app! What's your username?") || "Annonymous";
		this.setState({userName: userName});
		this.socket.emit('newConnection', userName);
		this.socket.on('chat message', function(userName, msg){
			$('#messages').append($('<li>').text(`${userName}: ${msg}`));
		});
		this.socket.on('newConnection', (userName) => {
			var newMessage = {type: "connection", name: userName};
			// $('#messages').append($('<li>').text(`${userName} has connected`));
			this.setState(function(prevState){
				return {messages: prevState.messages.concat([newMessage])};
			});
		});
		// when the window closes
		window.onbeforeunload = () => {
			this.socket.emit('window close', userName);
		};
		this.socket.on('user disconnected', function(userName){
			$('#messages').append($('<li>').text(`${userName} has disconnected`));
		});
	}
	render () {
		return (
			<div>
				<pre><code>{JSON.stringify(this.state)}</code></pre>
			  <ul id="messages">
					{this.state.messages.map((msg) => (<Message text={msg} key={index}/>))}
				</ul>
			</div>
			);
	}
}

module.exports = Chatbox
