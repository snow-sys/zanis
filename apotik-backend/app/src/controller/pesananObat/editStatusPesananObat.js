let {
  editPesananObat
} = require("../../repository/pesananObat");

let list_status = ["MENUNGGU", "SELESAI", "BATAL", "KONFIRMASI"];

module.exports = (req, res) => {
  let {
    uid_pesanan
  } = req.params;
  let {
    status_pesanan
  } = req.body;
  status_pesanan = status_pesanan.toUpperCase();
  if (list_status.find(e => e === status_pesanan)) {
    editPesananObat(uid_pesanan, {
        status_pesanan: status_pesanan,
        waktu_selesai: status_pesanan == "SELESAI" ?
          new Date() : status_pesanan == "KONFIRMASI" ?
          new Date() : null
      })
      .then(pesananObat => res.status(200).json(pesananObat))
      .catch(err => {
        console.error(err);
        res.status(400).json("error");
      });
  } else {
    res.status(400).json("inputan status salah");
  }
};