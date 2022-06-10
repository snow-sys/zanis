let {
  editHistoriMedis
} = require("../../repository/historiMedis");

module.exports = (req, res) => {
  let {
    nomor_rekam_medis
  } = req.params;
  let data = req.body;
  // console.log("control", nomor_rekam_medis, data)
  editHistoriMedis(nomor_rekam_medis, data)
    .then(newHistoriMedis => res.status(201).json(newHistoriMedis))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};