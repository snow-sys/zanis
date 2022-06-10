let { login } = require("../../repository/akunUser");
let { verifyToken } = require("../../module/token");

module.exports = (req, res) => {
  let { authorization } = req.headers;
  let plain = verifyToken(authorization);
  console.log("miaw", plain);

  try {
    let plain = verifyToken(authorization);
    res.status(200).json(plain);
  } catch (err) {
    res.status(400).json("token tidak valid");
  }
};
