let { tambahHistoriMedis } = require("../../repository/historiMedis");

module.exports = (req, res) => {
  let { nomor_rekam_medis } = req.params;
  let {id_lokasi} = req.body
  let data = req.body;
  tambahHistoriMedis(nomor_rekam_medis,id_lokasi, data)
    .then(newHistoriMedis => res.status(201).json(newHistoriMedis))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};
