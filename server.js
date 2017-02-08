var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var firebase = require("firebase");
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAvBfcrhH-GMPFdIL68yrkK_1k54vMBQEw",
  authDomain: "chat-app-e0b5d.firebaseapp.com",
  databaseURL: "https://chat-app-e0b5d.firebaseio.com",
  storageBucket: "chat-app-e0b5d.appspot.com",
};
firebase.initializeApp(config);
var database = firebase.database();
//var data = require('./data.json');
var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on' + port.toString());
});

app.use(express.static('./public'));
app.use(express.static('./node_modules/axios/dist'));

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

app.get(['/','/chat'], function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/replays', function(req,res){
	res.sendFile(__dirname + '/public/replays/replay.html');
});

// gets all the replays
app.get('/api/replays', function(req,res){
	var replaysRef = database.ref('/transcript').orderByKey();
	replaysRef.once('value').then(function(snapshot){
		var data = snapshot.val();
		res.json(data);
	});
});

// app.get('/script.js', function(req, res){
// 	res.sendFile(__dirname+ '/script.js');
// });

app.get('/data', function(req, res){
	database.ref('/transcript/0').once('value').then(function(snapshot){
		var data = snapshot.val();
		res.json(data);
	});
});
var startTime;
var clientCount = 0;
var firstConnection = true;
var userID = 0;
var messageID = 0;
var ids = {};
var transcript = {};
var createUser = function(userName){
	if(firstConnection){
		startTime = new Date().getTime();
		transcript.messages = [];
		transcript.startTime = new Date(startTime).toString();
		firstConnection = false;
	}
	userID ++;
	ids[userName] = userID;
	var newEntry = {
		delta: new Date().getTime()-startTime, 
		payload: {type: "connect", user: { id: userID, display_name: userName}}
	};
	transcript.messages.push(newEntry);
};

var createDisconnect = function(userName){
	var newEntry = {
		delta: new Date().getTime()-startTime,
		payload: {type: "disconnect", user: {id: ids[userName], display_name: userName}}
	};
	transcript.messages.push(newEntry);
};

var createMessage = function(userName, msg){
	messageID ++;
	var newEntry = {
		delta: new Date().getTime()-startTime, 
		payload: {type:"message", 
			user: { id: ids[userName], display_name: userName}, 
			message: {id: messageID, text: msg}
		}
	};
	transcript.messages.push(newEntry);
};

var saveTranscript = function(){
	database.ref('/transcript').push(transcript);
	console.log("saved to database");
};

io.on('connection', function(socket){
  socket.on('chat message', function(userName, msg){
  	// send to everyone except the socket that sent it
    socket.broadcast.emit('chat message', userName, msg);
    createMessage(userName, msg);
  });
  socket.on('newConnection', function(userName){
  	clientCount ++;
  	io.emit('newConnection', userName);
  	createUser(userName);
  });
  socket.on('window close', function(userName){
  	clientCount --;
  	createDisconnect(userName);
  	io.emit('user disconnected', userName);
  	if(clientCount === 0){
  		saveTranscript();
  	}
  });
});