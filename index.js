const express = require("express");
var app = express();
const http = require("http");

// if there's another route  then whichever ocmes first would be loaded up
// express.static uses any static file in the public folder
app.use(express.static(__dirname + `/public`));













var server = http.createServer(app);
server.listen(8080);
console.log("The Server is listening on port 8080");


