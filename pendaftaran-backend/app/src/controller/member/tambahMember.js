let { tambahMember } = require("../../repository/member");
let { encrypt } = require("../../module/encryption");

module.exports = (req, res) => {
  let data = req.body;
  tambahMember({ ...data, password: encrypt(data.password) })
    .then(newMember => res.status(201).json(newMember))
    .catch(err => {
      console.error(err);
      res.status(400).json("nomor pengenal atau email sudah ada");
    });
};
