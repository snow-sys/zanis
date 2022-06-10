let {
  login
} = require("../../repository/akunUser");
let {
  encrypt
} = require("../../module/encryption");
let {
  genToken
} = require("../../module/token");

module.exports = (req, res) => {
  let {
    nik,
    password
  } = req.body;
  // console.log(encrypt(password))
  login(nik, encrypt(password))
    .then(({
      rows
    }) => {
      if (rows.length > 0) {
        let token = genToken({
          uid: rows[0].uid,
          nik: rows[0].nik,
          nama: rows[0].nama,
          id_lokasi: rows[0].id_lokasi,
          nama_lokasi: rows[0].nama_lokasi,
          alamat: rows[0].alamat
        });
        res.status(200).json(token);
      } else {
        res.status(400).json("nik atau password salah");
      }
    })
    .catch(() => res.status(500).json("error"));
};