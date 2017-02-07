/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');
const Chatbox = require('./chatBox.jsx');
const Chatform = require('./chatForm.jsx');
const io = require('socket.io-client');
var $ = require("jquery");

class App extends React.Component{
	constructor (props) {
		super(props)
	}
	render () {
		return (
				<div>
					<Chatbox />
				</div>
			)
	}
}

module.exports = App