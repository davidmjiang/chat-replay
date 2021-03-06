/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');
const Message = require('./chatMessage.jsx');
const Chatform = require('./chatForm.jsx');
import { url } from '../constants.jsx';
var io = require('socket.io-client');
import { connect } from 'react-redux';
import { addMessage }from '../redux-stuff/actionCreators.js'
import { deleteMessage } from '../redux-stuff/actionCreators.js'
import { toggleEdit } from '../redux-stuff/actionCreators.js'
import { editMessage } from '../redux-stuff/actionCreators.js'
const { array } = React.PropTypes

class Chatbox extends React.Component {
	constructor (props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.toggleEdit = this.toggleEdit.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}
	componentWillMount(){
		this.socket = io(url);
		this.userName = prompt("Welcome to my chat app! What's your username?") || "Annonymous";
		this.socket.emit('newConnection', this.userName);

		this.socket.on('chat message', (userName, userID, message, messageID) => {
			var newMessage = {type: "message", message, userName, userID, messageID, editing: false};
			this.props.dispatch(addMessage(newMessage))
		});
		this.socket.on('newConnection', (userName) => {
			var newMessage = {type: "connection", name: userName};
			this.props.dispatch(addMessage(newMessage))
		});
		// when the window closes
		window.onbeforeunload = () => {
			this.socket.emit('window close', this.userName);
		};
		this.socket.on('user disconnected', (userName) => {
			var newMessage = {type: "disconnection", name: userName};
			this.props.dispatch(addMessage(newMessage))
		});
		this.socket.on('deleted', (messageID) => {
			this.props.dispatch(deleteMessage(messageID))
		});
		this.socket.on('edited', (messageID, msg) => {
			this.props.dispatch(editMessage(messageID, msg))
		});
	}
	handleSubmit(msg){
		this.socket.emit('chat message', this.userName, msg)
	}
	handleDelete(messageID){
		this.props.dispatch(deleteMessage(messageID))
		this.socket.emit('deleted', messageID)
	}
	toggleEdit(messageID){
		this.props.dispatch(toggleEdit(messageID))
	}
	handleEdit(messageID, msg){
		this.props.dispatch(editMessage(messageID, msg))
		this.socket.emit('edited', messageID, msg)
	}
	render () {
		return (
			<div>
			  <ul id="messages">
					{this.props.messages.map((msg, index) => (<Message text={msg} key={index} userName={this.userName} handleDelete={this.handleDelete} toggleEdit={this.toggleEdit} handleEdit={this.handleEdit} />))}
				</ul>
				<Chatform handleSubmit={this.handleSubmit} />
			</div>
			);
	}
}

Chatbox.proptypes = {
	messages: array
}


// takes in the redux store and returns what is needed by the component
const mapStateToProps = (state) => {
	return {
		messages: state.messages
	}
}

//this makes ChatBox a redux-enabled component
//it will have props generated from mapStateToProps
export default connect(mapStateToProps)(Chatbox)
