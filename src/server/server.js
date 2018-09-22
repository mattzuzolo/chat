//built-in node modules
const http = require("http");

//external libraries
const express = require("express");
const socketIO = require("socket.io");

//local js files
const { logSocket } = require("./socketManager")

//configure server and sockets
const PORT = process.env.PORT || 4000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
module.exports = { io }

//Socket listeners
//socket goes to single connection
//io.emit goes to all

io.on("connection", (socket) => {
  console.log("connected at", socket.id)

  socket.on("join", (callback) => {
    console.log("Join occured successfully")
    socket.emit("newMessage", {user: "Admin", message: "Welcome to the app. This was sent from the backend"});
    callback();
  })


  socket.on("createMessage", (message, callback) => {
    console.log("backend createMessage:", message)
      socket.broadcast.emit("newMessage", {
        ...message,
        createdAt: new Date().getTime()
      });
      // io.emit("newMessage", {
      //   ...message,
      //   createdAt: new Date().getTime()
      // });
    callback("server acknowledgement");
  });

  socket.on("disconnect", () => {
    console.log("disconnected")
  });

});



server.listen(PORT, () => {
  console.log(`Started on port ${PORT}.`);
})
