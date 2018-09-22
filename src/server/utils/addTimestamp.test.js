let expect = require("expect");

let { addTimestamp } = require("./addTimestamp");

describe("addTimestamp", () => {
  it("should add a timestamp to the message object", () => {
    let messageObj = { from: "TESTUSER", text: "TEST MESSAGE" };
    let messageWithTime = addTimestamp(messageObj);

    expect(messageWithTime.timestamp).toBeA("number");
    expect(messageWithTime.from).toBe("TESTUSER");
    expect(messageWithTime.text).toBe("TEST MESSAGE");
  })
})
