const { Conversation } = require("../models/conversation");
const { ObjectID } = require("mongodb");

module.exports = {
  index(request, response, next){
    Conversation.find({})
      .populate("members")
      .populate("messages")
      .populate("messages.user")
      .then(conversations => response.send({conversations}))
      .catch(next);
  },

  create(request, response, next){
    let body = (({name, members, messages}) => ({name, members, messages}))(request.body);

    let conversation = new Conversation(body);
    conversation.save()
      .then((doc) => response.send(doc))
      .catch(next);
  },
}
