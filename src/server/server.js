//native node modules
const http = require("http");

//external libraries
const express = require("express");
const socketIO = require("socket.io");

//local js files
const SocketManager = require("./socketManager")

//configure server and sockets
const PORT = process.env.PORT || 4000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
module.exports = { io }



io.on("connection", (socket) => {
  console.log("Socket ID: ", socket.id);
})

server.listen(PORT, () => {
  console.log(`Started on port ${PORT}.`);
})
