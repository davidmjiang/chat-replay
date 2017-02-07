/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');
const Message = require('./chatMessage.jsx');
const Chatform = require('./chatForm.jsx');
var io = require('socket.io-client');

class Chatbox extends React.Component {
	constructor (props) {
		super(props)
		this.state = {messages: []}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentWillMount(){
		this.socket = io('http://localhost:3000');
		this.userName = prompt("Welcome to my chat app! What's your username?") || "Annonymous";
		this.socket.emit('newConnection', this.userName);

		this.socket.on('chat message', (userName, msg) => {
			var newMessage = {type: "message", message: msg};
			this.setState(function(prevState){
				return {messages: prevState.messages.concat([newMessage])};
			});
		});
		this.socket.on('newConnection', (userName) => {
			var newMessage = {type: "connection", name: userName};
			
			this.setState(function(prevState){
				return {messages: prevState.messages.concat([newMessage])};
			});
		});
		// when the window closes
		window.onbeforeunload = () => {
			this.socket.emit('window close', this.userName);
		};
		this.socket.on('user disconnected', (userName) => {
			var newMessage = {type: "disconnection", name: userName};
			this.setState(function(prevState){
				return {messages: prevState.messages.concat([newMessage])};
			});
		});
	}
	handleSubmit(msg){
		// add to chatbox for person who sent it
		var newMessage = {type: "message", message: msg, canDelete: true}
		this.setState(function(prevState){
			return {messages: prevState.messages.concat([newMessage])}
		})
		this.socket.emit('chat message', this.userName, msg)
	}
	render () {
		return (
			<div>
			  <ul id="messages">
					{this.state.messages.map((msg, index) => (<Message text={msg} key={index}/>))}
				</ul>
				<Chatform handleSubmit={this.handleSubmit}/>
			</div>
			);
	}
}

module.exports = Chatbox
