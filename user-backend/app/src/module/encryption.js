let crypto = require("crypto");

let key = "miawmiaw";

exports.encrypt = plainPassword =>
  crypto
  .createHash("sha256")
  .update(JSON.stringify({
    data: plainPassword,
    key
  }))
  .digest("hex");