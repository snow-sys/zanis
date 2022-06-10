let {
  tambahTransaksiBelanja
} = require("../../repository/transaksi");

let listJenisPembayaran = ["CASH", "KREDIT"];

module.exports = (req, res) => {
  let
    data = req.body;
  // console.log(data)
  data.jenis_pembayaran = data.jenis_pembayaran.toUpperCase();
  let valid = listJenisPembayaran.indexOf(data.jenis_pembayaran) !== -1;
  // console.log(valid)

  if (valid) {
    // console.log("miaw")
    tambahTransaksiBelanja(data)
      .then(newTransaksi => res.status(201).json(newTransaksi))
      .catch(err => {
        console.error(err);
        res.status(400).json("error");
      });
  } else {
    res.status(400).json("jenis pembayaran tidak valid");
  }
};