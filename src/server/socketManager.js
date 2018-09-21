const io = require("./server.js");

let logSocket = (socket) => {
  return console.log("Socket ID: ", socket.id);
}

module.exports = { logSocket };
