const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { ObjectID } = require("mongodb");


//Require other models/schemas
const UserSchema = require("./user");
const MessageSchema = require("./messageSchema");

const ConversationSchema = new Schema({
  name: {
    type: String,
  },
  members: [{
    type: Schema.ObjectId,
    ref: "user",
  }],
  messages: [MessageSchema]
})

const Conversation = mongoose.model("conversation", ConversationSchema);

module.exports = { Conversation };
