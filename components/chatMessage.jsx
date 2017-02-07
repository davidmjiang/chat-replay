/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');

class Message extends React.Component {
	render () {
		let text;
		if(this.props.text.type === 'connection'){
			text = `${this.props.text.name} has connected`;
		}
		else{
			text = this.props.text;
		}
		return (
			<li>{text} <a>X</a></li>
			);
	}
}

module.exports = Message