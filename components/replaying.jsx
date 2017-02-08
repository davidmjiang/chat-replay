/* jshint strict: false, asi: true, esversion:6 */
const React = require('react');
// this.props.chat
class Replaying extends React.Component{
	constructor(props){
		super(props)
		this.transcript = this.props.chat.messages
		this.delta = 0
	}
  tick(idx){
  	if(idx < this.transcript.length){
	 	var data = transcript[idx];
	 	var cb;
	  switch(data.payload.type){
	    case "message":
	    cb = addMessage;
	    break;
	    case "connect":
	    cb = addConnection;
	    break;
	    case "update":
	    cb = update;
	    break;
	    case "delete":
	    cb = deleteMessage;
	    break;
	    case "disconnect":
	    cb = disconnect;
	    break;
	    default:
	    console.log('unknown paylaod type');
	    break;
	  }
	  setTimeout(function(){
	  	cb(data.payload);
	  	this.delta = data.delta;
	  	// call tick on the next line in the transcript
	  	tick(idx + 1);
	  }, (data.delta - this.delta));
	 }
  }
	render () {
		return <div className="chat-box"></div>
	}
}

export default Replaying