$(document).ready(()=>{
	// console.log("hello world");
	// setup the route to piggyback on
	var socketUrl = "http://127.0.0.1:8080";
	// io object came from index.html scipt io link
	var socketio = io.connect(socketUrl);
	var name = prompt("what is your name");
	socketio.emit("nameToServer", name);
	socketio.on("newUser", (users)=>{
		// console.log(`${userName} just joined`);
		var userHTML = ""
		users.map((user)=>{
			userHTML += `<div class="col-sm-12">${user.name}</div>`
		})
		$("#users").html(userHTML);
	});
	$("#submit-message").submit((e)=>{
		e.preventDefault();
		var newMessage = $("#new-message").val();
		socketio.emit("messageToServer", {
			name: name,
			message: newMessage
		})
	});
	socketio.on("messageToClient", (message)=>{
		$("#messages").prepend(`<p>${message.message} -- ${message.name}</p>`)
	})
});