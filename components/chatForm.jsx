/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');

class Chatform extends React.Component{
	constructor(props){
		super(props)
		this.state = {value: ''}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleChange(event){
		this.setState({value: event.target.value})
	}
	handleSubmit(event){
		event.preventDefault();
		this.props.handleSubmit(this.state.value)
		this.setState({value: ''})
	}
	render(){
		return (
			<form action="">
	      <input id="m" autocomplete="off" value={this.state.value} onChange={this.handleChange}/><button onClick={this.handleSubmit}>Send</button>
	    </form>
		)
	}
}

module.exports = Chatform