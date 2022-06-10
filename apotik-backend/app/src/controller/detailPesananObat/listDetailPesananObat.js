let {
  listDetailPesananObat
} = require("../../repository/detailPesananObat");
// let ax = require('axios').default

module.exports = (req, res) => {
  let {
    uid_pesanan
  } = req.params;
  listDetailPesananObat(uid_pesanan)
    .then(listPesanan => res.status(200).json(listPesanan))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};