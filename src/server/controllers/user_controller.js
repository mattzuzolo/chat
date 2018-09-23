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

    let user = new User(body);
    user.save()
      .then((doc) => response.send(doc))
      .catch(next);
  },
}
