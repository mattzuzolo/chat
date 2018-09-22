const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { ObjectID } = require("mongodb");

//require schemas
const UserSchema = require("./user");

const MessageSchema = new Schema({
  text: {
    type: String,
  },
  user: {
    type: Schema.types.ObjectId,
    ref: "user",
  },
  timestamp: {
    type: Number,
  },
})

module.exports = { MessageSchema }
