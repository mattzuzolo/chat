const { User } = require("../models/user");
const { ObjectID } = require("mongodb");

module.exports = {
  index(request, response, next){
    User.find({})
      .then(users => response.send({users}))
      .catch(next);
  },

  create(request, response, next){
    let body = (({username}) => ({username}))(request.body);

    console.log("body", body);
    let user = new User(body);
    console.log("user", user);
    // user.save()
      // .send(user);
      // .catch(next);
  },
}
