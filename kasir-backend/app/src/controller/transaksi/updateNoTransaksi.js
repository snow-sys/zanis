let {
  updateNoTransaksi
} = require("../../repository/transaksi")

module.exports = (req, res) => {
  let {
    nomor_rekam_medis
  } = req.params;
  let {
    id_lokasi
  } = req.query
  updateNoTransaksi(nomor_rekam_medis, id_lokasi)
    .then(transaksi => res.status(200).json(transaksi))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};