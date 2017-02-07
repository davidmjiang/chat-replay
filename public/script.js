/* jshint strict: false, asi: true, esversion:6 */
const React = require('react')
const ReactDOM = require('react-dom')
const Chatbox = require('../components/chatBox.jsx');
const $ = require("jquery");

ReactDOM.render(<Chatbox />, document.getElementById('chatbox'));

$('form').submit(function(){
  socket.emit('chat message', userName, $('#m').val());
  $('#m').val('');
  return false;
});