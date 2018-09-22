//built-in node modules
const http = require("http");

//external libraries
const express = require("express");
const socketIO = require("socket.io");

//local js files
const { logSocket } = require("./socketManager")
const { addTimestamp } = require("./utils/addTimestamp");


//configure server and sockets
const PORT = process.env.PORT || 4000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
module.exports = { io }

//socket listeners
io.on("connection", (socket) => {
  console.log("connected at", socket.id)

  socket.on("join", (callback) => {
    console.log("A user joined the chat")
    socket.emit("newMessage", addTimestamp({user: "Admin", text: "Welcome to the app."}));
    callback();
  })

  socket.on("createMessage", (message, callback) => {
    console.log("createMessage:", message)
    socket.broadcast.emit("newMessage", addTimestamp(message));
    callback("server acknowledgement");
  });

  socket.on("disconnect", () => {
    console.log("disconnected")
  });

});

server.listen(PORT, () => {
  console.log(`Started on port ${PORT}.`);
})
