const { Conversation } = require("../models/conversation");
const { ObjectID } = require("mongodb");

module.exports = {
  index(request, response, next){
    Conversation.find({})
      .populate("messages")
      .then(conversations => response.send({conversations}))
      .catch(next);
  },

  create(request, response, next){
    // let body = (({name, members, messages}) => ({name, members, messages}))(request.body);
    console.log("\n\nREQUEST BODY", body);

    let conversation = new Conversation(body);
    conversation.save()
      .then((doc) => response.send(doc))
      .catch(next);
  },
}
