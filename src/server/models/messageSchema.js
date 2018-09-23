const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//require schemas
const UserSchema = require("./user");

const MessageSchema = new Schema({
  text: {
    type: String,
  },
  user: {
    type: Schema.ObjectId,
    ref: "user",
  },
  timestamp: {
    type: Number,
  },
})

module.exports = { MessageSchema }
