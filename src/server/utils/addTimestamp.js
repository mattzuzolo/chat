const moment = require("moment");

let addTimestamp = (messageObj) => {
  return {
    ...messageObj,
    timestamp: moment().valueOf()
  };
};

module.exports = { addTimestamp };
