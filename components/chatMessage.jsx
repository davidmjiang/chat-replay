/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');

class Message extends React.Component {
	constructor(){
		super()
		this.handleDelete = this.handleDelete.bind(this)
	}
	handleDelete(){
		this.props.handleDelete(this.props.text.messageID)
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
			return <li>{this.props.text.userName}: {this.props.text.message} <button onClick={this.handleDelete}>X</button></li>;
		}
		else{
			return <li>{this.props.text.userName}: {this.props.text.message}</li>;	
		}
	}
}

module.exports = Message