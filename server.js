var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var firebase = require("firebase");
// Initialize Firebase
var config = {
  apiKey: process.env.apikey,
  authDomain: process.env.authdomain,
  databaseURL: "https://chat-app-e0b5d.firebaseio.com",
  storageBucket: "chat-app-e0b5d.appspot.com",
};
firebase.initializeApp(config);
var database = firebase.database();

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on' + port.toString());
});

app.use(express.static('./public'));
app.use(express.static('./node_modules/axios/dist'));
app.use(express.static('./node_modules/font-awesome/css'));

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

var clients = {};
var startTime;
var clientCount = 0;
var firstConnection = true;
var userID = 0;
var messageID = 0;
var transcript = {};
var createUser = function(userName){
	if(firstConnection){
		startTime = new Date().getTime();
		transcript.messages = [];
		transcript.startTime = new Date(startTime).toString();
		firstConnection = false;
	}
	userID ++;
	clients[userName].id = userID;
	var newEntry = {
		delta: new Date().getTime()-startTime, 
		payload: {type: "connect", user: { id: userID, display_name: userName}}
	};
	transcript.messages.push(newEntry);
};

var createDisconnect = function(userName){
	var newEntry = {
		delta: new Date().getTime()-startTime,
		payload: {type: "disconnect", user: {id: clients[userName].id, display_name: userName}}
	};
	transcript.messages.push(newEntry);
};

var createMessage = function(userName, msg){
	messageID ++;
	var newEntry = {
		delta: new Date().getTime()-startTime, 
		payload: {type:"message", 
			user: { id: clients[userName].id, display_name: userName}, 
			message: {id: messageID, text: msg}
		}
	};
	transcript.messages.push(newEntry);
};

var createDelete = function(mID){
	var newEntry = {
		delta: new Date().getTime()-startTime,
		payload: {type: "delete",
			message: {
				id: mID
			}
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
  	var userID = clients[userName].id;
    createMessage(userName, msg);
  	io.emit('chat message', userName, userID, msg, messageID);
  });
  socket.on('deleted', function(mID){
  	socket.broadcast.emit('deleted', mID);
  	createDelete(mID);
  });
  socket.on('newConnection', function(userName){
  	clientCount ++;
  	clients[userName] = {
  		"socket": socket.id
  	};
  	createUser(userName);
  	io.emit('newConnection', userName);
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