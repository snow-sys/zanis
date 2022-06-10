let { login } = require("../../repository/akunUser");
let { genToken, verifyToken } = require("../../module/token");

module.exports = (req, res) => {
  let { token } = req.headers;
  try {
    let { iat, exp, ...plain } = verifyToken(token);
    let newToken = genToken(plain);
    res.status(200).json(newToken);
  } catch (err) {
    res.status(400).json("token tidak valid");
  }
};
