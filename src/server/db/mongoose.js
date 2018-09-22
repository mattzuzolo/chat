const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV === "test"){
  mongoose.connect("mongodb://localhost/chat_test", { useNewUrlParser: true });
} else {
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/chat", { useNewUrlParser: true })
}



module.exports = { mongoose };
