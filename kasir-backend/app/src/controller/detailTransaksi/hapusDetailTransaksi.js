let {
  hapusDetailTransaksi
} = require("../../repository/detailTransaksi");

module.exports = (req, res) => {
  let {
    uid
  } = req.params;

  // console.log(uid)
  hapusDetailTransaksi(uid)
    .then(listDetail => res.status(200).json(listDetail))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};