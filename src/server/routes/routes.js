const UserController = require("../controllers/user_controller");
const ConversationController = require("../controllers/conversation_controller");

module.exports = (app) => {

  //user endpoints
  app.get("/users", UserController.index);
  app.post("/users", UserController.create);

  //conversation endpoints
  // app.get("conversations", ConversationController.index);
  // app.get("conversations/:id", ConversationController.findConversationById);
  // app.post("conversations", ConversationController.create);
  //
}
