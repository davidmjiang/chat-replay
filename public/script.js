/* jshint strict: false, asi: true, esversion:6 */
var io = require('socket.io-client');

var socket = io();
var userName;
var getUserName = function(){
  userName = prompt("Welcome to my chat app! What's your username?") || "Annonymous";
  socket.emit('newConnection', userName);
};
getUserName();
$('form').submit(function(){
  socket.emit('chat message', userName, $('#m').val());
  $('#m').val('');
  return false;
});
socket.on('chat message', function(userName, msg){
  $('#messages').append($('<li>').text(`${userName}: ${msg}`));
});
socket.on('newConnection', function(userName){
  $('#messages').append($('<li>').text(`${userName} has connected`));
});
// when the window closes
window.onbeforeunload = function(){
  socket.emit('window close', userName);
};
socket.on('user disconnected', function(userName){
  $('#messages').append($('<li>').text(`${userName} has disconnected`));
});