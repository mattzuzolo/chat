const mongoose = require("mongoose");
const User = mongoose.model("user");

before(done => {
  mongoose.connect("mongodb://localhost/chat_test");

  mongoose.connection
    .once("open", () => mongoose.connection.collections)
    .then(() => User.remove({}))
    .then(() => done())
    .catch(() => done());
})
