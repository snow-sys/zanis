let jwt = require("jsonwebtoken");
let key = "miiawmiawaww";

exports.genToken = data => jwt.sign(data, key, { expiresIn: 60 * 5 });

exports.verifyToken = token => jwt.verify(token, key);
