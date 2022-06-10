let {
  tambahDetailPesananObat
} = require("../../repository/detailPesananObat");

module.exports = (req, res) => {
  let {
    uid_pesanan,
    uid_obat,
    jumlah_obat,
    keterangan
  } = req.body
  tambahDetailPesananObat(uid_pesanan, uid_obat, jumlah_obat, keterangan)
    .then(listPesanan => res.status(200).json(listPesanan))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};