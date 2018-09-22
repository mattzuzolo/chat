const { app } = require("../../server");
const mongoose = require("mongoose");
const expect = require("expect");
const request = require("supertest");

const User = mongoose.model("user");

describe("User controller", () => {

  let username = "TESTUSER";

  it("POST to /users creates a new user", (done) => {
    User.count().then((count) => {
      request(app)
        .post("/users")
        .send({username})
        // .expect(200)
        .expect((response) => {
          console.log("\n\nRESPONSE:", response.body)
          expect(response.body.username).toBe(username);
        })
        .end((error,response) => {
          if(error){
            return done(error);
          }
          User.find().then((users) => {
            expect(users.length).toBe(count + 1);
            expect(users[0].username).toBe(username)
            done();
          })
          .catch(error => done(error));
        })
    })
  });

  it("GET to /users returns all users", (done) => {
    User.count().then((count) => {
      request(app)
        .get("/users")
        .expect(200)
        .expect((response) => {
          expect(response.body.users.length).toBe(count)
        })
        .end(done);
    })
  })


})
