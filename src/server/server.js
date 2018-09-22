//built-in node modules
const http = require("http");

//external libraries
const express = require("express");
const bodyParser = require("body-parser")
const { ObjectID } = require("mongodb");
const { mongoose } = require("./db/mongoose");
const socketIO = require("socket.io");

//local js files
const { addTimestamp } = require("./utils/addTimestamp");
const { logSocket } = require("./socketManager")

//API and database imports
const routes = require("./routes/routes");
const { User } = require("./models/user");
const { Conversation } = require("./models/conversation");

//configure server and sockets
const PORT = process.env.PORT || 4000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
module.exports = { io }

//configure middleware
app.use(bodyParser.json());
routes(app);
app.use((error, request, response, next) => {
  response.status(422).send({ error: error.message });
});

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

module.exports = { app };
