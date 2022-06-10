let {
  tambahUser
} = require("../../repository/akunUser");
let {
  encrypt
} = require("../../module/encryption");

module.exports = (req, res) => {
  let {
    nik,
    password,
    nama,
    email,
    role,
    id_lokasi
  } = req.body;
  // console.log(nik,password, nama,email,nama_lokasi)
  tambahUser({
      nik,
      password: encrypt(password),
      nama,
      email,
      role,
      id_lokasi
    })
    .then(({
      rows
    }) => res.status(201).json(rows[0]))
    .catch(err => res.json(err));
};