//built-in node modules
const http = require("http");

//external libraries
const express = require("express");
const socketIO = require("socket.io");

//local js files
//db files
const { logSocket } = require("./socketManager")

//configure server and sockets
const PORT = process.env.PORT || 4000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
module.exports = { io }

//Socket listeners
io.on("connection", (socket) => {
  console.log("connected at", socket.id)

  socket.on("join", (callback) => {
    console.log("Join occured successfully")
    socket.emit("newMessage", {user: "Admin", message: "Welcome to the app"});
    callback();
  })

  socket.on("createMessage", (message, callback) => {
    console.log("backend createMessage", message)
      io.emit("newMessage", { user: "io.emit user", message: "createMessage emission"});
    callback("server acknowledgement");
  });

  socket.on("disconnect", () => {
    console.log("disconnected")
  });

});



server.listen(PORT, () => {
  console.log(`Started on port ${PORT}.`);
})
