/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');

class Message extends React.Component {
	constructor(props){
		super(props)
		this.state = { messageText: this.props.text.message }
		this.handleDelete = this.handleDelete.bind(this)
		this.toggleEdit = this.toggleEdit.bind(this)
		this.editOrRenderMessage = this.editOrRenderMessage.bind(this)
		this.handleInput = this.handleInput.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}
	handleDelete(){
		this.props.handleDelete(this.props.text.messageID)
	}
	toggleEdit(){
		if(this.props.text.editing){
			this.setState( {messageText: this.props.text.message })
		}
		this.props.toggleEdit(this.props.text.messageID)
	}
	handleInput(e){
		this.setState({ messageText: e.target.value })
	}
	handleEdit(){
		this.props.handleEdit(this.props.text.messageID, this.state.messageText)
	}
	editOrRenderMessage(){
		let message;
		if(this.props.text.editing){
			message = <li className="message-edit">
									<input type="text" onChange={this.handleInput} value={this.state.messageText}/>
									<button className="icons" onClick={this.toggleEdit}>Cancel</button>
									<button className="icons" onClick={this.handleEdit}>Edit</button>
								</li>
		}
		else{
			message = <li className="message">{this.props.text.userName}: {this.props.text.message} <button className="icons" onClick={this.handleDelete}>X</button><button className="icons" onClick={this.toggleEdit}>Edit</button></li>;
		}
		return message
	}
	render () {
		let text;
		if(this.props.text.type === 'connection'){
			text = `${this.props.text.name} has connected`;
			return <li>{text}</li>;
		}
		else if(this.props.text.type === 'disconnection'){
			text = `${this.props.text.name} has disconnected`;
			return <li>{text}</li>;
		}
		// messages
		else if(this.props.text.userName === this.props.userName){
			return this.editOrRenderMessage()
		}
		else{
			return <li>{this.props.text.userName}: {this.props.text.message}</li>;	
		}
	}
}

module.exports = Message