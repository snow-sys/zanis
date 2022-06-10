let {
  listDetailTransaksi
} = require("../../repository/detailTransaksi");

module.exports = (req, res) => {
  let {
    uid_transaksi
  } = req.params;
  listDetailTransaksi(uid_transaksi)
    .then(detailTransaksi => res.status(200).json(detailTransaksi))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};