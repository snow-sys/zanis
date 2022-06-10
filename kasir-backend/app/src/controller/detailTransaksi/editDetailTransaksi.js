let {
  editDetailTransaksi
} = require("../../repository/detailTransaksi");

module.exports = (req, res) => {
  let {
    uid
  } = req.params;
  let {
    jumlah_item,
    diskon
  } = req.body
  // console.log(uid, jumlah_item, diskon)
  editDetailTransaksi(uid, jumlah_item, diskon)
    .then(listDetail => res.status(200).json(listDetail))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};