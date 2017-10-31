const express = require("express");
var app = express();
var socketio = require("socket.io");

const http = require("http");

// if there's another route  then whichever ocmes first would be loaded up
// express.static uses any static file in the public folder
app.use(express.static(__dirname + `/public`));




var users = [];





var server = http.createServer(app);
server.listen(8080);
// make a new var called io that is listening to the listener
var io = socketio.listen(server); //only listen at ws://localhost:8080
// the way that socket.io to Worker....
	// 1. .on to listen
	// 2. .emit to send
io.sockets.on("connect", (socket)=>{
	console.log("someone connect via a socket");

	// when connected add all listener
	socket.on("nameToServer", (data)=>{
		var clientInfo ={
			name: data,
			clientID: socket.id
		}
		users.push(clientInfo);
		// console.log(data);
		// emit takes two args
		// 1. event(we make this up, except a few);
		// 2. Data to send
		io.sockets.emit("newUser", users);
	});
	socket.on("messageToServer", (message)=>{
		console.log(message);
		io.sockets.emit("messageToClient", message )
	})
});
console.log("The Server is listening on port 8080");


