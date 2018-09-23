const { app } = require("../../server");
const mongoose = require("mongoose");
const expect = require("expect");
const request = require("supertest");

const Conversation = mongoose.model("conversation");

describe("Conversation model", () => {
  it("can add a message", (done) => {
    const chatroomSeven = new Conversation({
      name: "chatroomSeven",
      members: [],
      messages: [{text: "test message one"}]
    });

    chatroomSeven.save()
      .then(() => conversation.findOne({name: "chatroomSeven"}))
      .then((conversation) => {
        expect(conversation.messages[0]).toBe(chatroomSeven.messages.text)
      });
      done();
  })
})
