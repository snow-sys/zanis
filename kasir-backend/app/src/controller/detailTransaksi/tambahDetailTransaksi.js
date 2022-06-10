let {
  tambahDetailTransaksi
} = require("../../repository/detailTransaksi");

module.exports = (req, res) => {
  let {
    nomor_rekam_medis,
    listDetail

  } = req.body;
  // console.log(nomor_rekam_medis, listDetail)
  tambahDetailTransaksi(nomor_rekam_medis, listDetail)
    .then(newDetailTransaksi => res.status(201).json(newDetailTransaksi))
    .catch(err => {
      console.error(err);
      res.status(400).json(err);
    });
};