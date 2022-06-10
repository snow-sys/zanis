let {
  hapusDetailPesananObat
} = require("../../repository/detailPesananObat");
// let ax = require('axios').default

module.exports = (req, res) => {
  let {
    uid
  } = req.params;
  // let jumlah_obat = req.query
  // console.log(uid)
  hapusDetailPesananObat(uid)
    .then(listPesanan => res.status(200).json(listPesanan))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};